const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Promise = require('bluebird'),
        
        config = require('../../config')(),
        roles = require('../../roles'),
        util = require('../../util'),

        Subscription = require('../../models/subscription.model'),
        User = require('../../models/user.model'),
        Team = require('../../models/team.model'),
        Purchase = require('../../models/purchase.model'),
        Invite = require('../../models/invite.model'),
        HistoryModel = require('../../models/history.model'),

        WHITELIST = [
            'email',
            'firstName',
            'lastName',
            'title',
            'company',
            'phone',
            'address',
            'city',
            'state',
            'zip',
            'country',
            'improvExp',
            'facilitationExp',
            'trainingInterest',
            'url',
            'description'
        ];

module.exports = {

    create: (req, res) => {
        
        let email = req.body.email,
            password = req.body.password,
            inviteId = req.body.invite,
            userName = req.body.name;

        if (!email || !password || !inviteId || !userName) {
            return res.status(500).json({error: 'Please enter all of the information.'})
        }

        return Invite.findOne({})
            .where('_id').equals(inviteId)
            .exec()
            .then(invite => {
                if (!invite) {
                    return res.status(500).json({error: 'unknown invite'});
                } else if (invite.accepted) {
                    return res.status(500).json({error: 'invite taken'});
                } else {

                    if (invite.email != email) {
                        // we will require the email as a sort of validation
                        return res.status(500).json({error: 'wrong email'});
                    } else {

                        let inviteTeam = util.getObjectIdAsString(invite.team),
                            role = invite.role,
                            firstName = '',
                            lastName = '';

                        if (userName) {
                            firstName = userName.substr(0, (userName+' ').indexOf(' ')).trim();
                            lastName = userName.substr((userName+' ').indexOf(' '), userName.length).trim();
                        }

                        invite.accepted = true;
                        invite.dateAccepted = Date.now();

                        invite.save();

                        bcrypt.hash(password, config.saltRounds).then(hash => {
                            return User.create({
                                email: email,
                                password: hash,
                                firstName: firstName,
                                lastName: lastName
                            });
                        })
                        .then(user => {

                            HistoryModel.create({
                                user: user._id,
                                action: 'invite_accept',
                                reference: invite._id.toString()
                            });

                            if (inviteTeam) {
                                Team.findOne({}).where('_id').equals(inviteTeam).exec()
                                    .then(team => {
                                        team.members = util.addToObjectIdArray(team.members, user._id);
                                        return team.save();
                                    })
                                    .then(team => {
                                        user.memberOfTeams = util.addToObjectIdArray(user.memberOfTeams, team._id);
                                        return user.save();
                                    })
                                    .then(user => {
                                        return Subscription.findOne({})
                                            .where('team').equals(inviteTeam)
                                            .exec()
                                    })
                                    .then(subscription => {
                                        // create a subscription for the new user
                                        return subscription.createChildSubscription(user)
                                    })
                                    .then(subscription => {
                                        if (!subscription) {
                                            // if the promise returns false, there were no available subs left
                                            // TODO: adding a user to a team without using a subscription

                                        } else {
                                            // remove the invite from team's subscription, so it won't count against anything anymore
                                            subscription.invites = util.removeFromObjectIdArray(subscription.invites, invite);
                                            return subscription.save();
                                        }
                                    })
                                    .then(subscription => {
                                        // we should be done, but we want to return the new user
                                        return User.findOne({}).where('_id').equals(user._id.toString()).exec()
                                    })
                                    .then(newUser => {
                                        res.json(module.exports.prepUserObject(newUser));
                                    })
                            } else {
                                // this user was invited as a regular user
                                // TODO: this
                            }

                        }, error => {
                            console.error(error);
                            res.status(500).json({error: 'There was an error creating your account.'});
                        });

                    }

                }
            })

    },

    getAll: (req, res) => {
        User.find({}).exec()
            .then((users) => {
                res.json(users);
            });
    },

    get: (req, res) => {
        return module.exports.findUser(req.params.id)
            .catch(err => {
                util.handleError(req, res, err);
            })
            .then(user => {
                res.json(user);
            });
    },

    update: (req, res) => {
        let formData = req.body,
            password = req.body.password,
            promise,
            oldUser;

        if (password) {
            promise = bcrypt.hash(password, config.saltRounds);
        } else {
            promise = Promise.resolve();
        }
        
        promise.then(hash => {
             return module.exports.findUser(req.params.id, null, null, true)
                .then(user => {
                    oldUser = user.toObject();
                    delete oldUser.password;

                    user = util.smartUpdate(user, formData, WHITELIST);

                    if (hash) {
                        user.password = hash;
                    }

                    user.dateModified = Date.now();

                    return user.save((err, saved) => {
                        if (err) {
                            util.handleError(req, res, err);
                        } else {
                            let changes = util.findChanges(oldUser, saved);

                            if (hash) {
                                changes.push({
                                    property: 'password'
                                });
                            }

                            HistoryModel.create({
                                user: saved,
                                action: 'account_edit',
                                changes: changes
                            });

                            saved = module.exports.prepUserObject(saved);

                            if (res) {
                                res.json(saved);
                            }
                        }
                    });
                });
        });
    },

    delete: (req, res) => {
        User.find({})
            .where('_id').equals(req.params.id)
            .remove((err) => {
                if (err) {
                    util.handleError(req, res, err);
                } else {
                    res.send("User Deleted");
                }
            });
    },

    findUser: (key, select, populate, raw) => {
        if (!key) {
            return Promise.reject('no id or email');
        }

        let query = User.findOne({})
            .select(WHITELIST.join(' ') + 
            ' subscription preferences memberOfTeams adminOfTeams role dateAdded dateModified superAdmin locked ' + select);

        // catch a mongoose ObjectID, which looks like a string but isn't really
        if (typeof(key) == 'object' && key.toString) {
            key = key.toString();
        }

        if (key.indexOf && key.indexOf('@') > -1) {
            query.where('email').equals(key);
        } else {
            query.where('_id').equals(key);
        }

        query.populate('preferences')
            .populate({
                path: 'subscription',
                select: '-stripeCustomerId'
            })

        if (populate) {
            query.populate(populate);
        }

        return query.exec()
            .catch(error => {
                return Promise.resolve(null);
            })
            .then(user => {
                if (user && !raw) {
                    user = module.exports.prepUserObject(user);
                }

                return Promise.resolve(user);
            });
    },

    prepUserObject: (user) => {
        if (user.toObject) {
            user = user.toObject();
        }

        if (!user.superAdmin) {
            delete user.superAdmin;
        }
        
        // make sure the user has an active subscription
        if (user.locked) {
            user.actions = roles.getActionsForRole(roles.ROLE_LOCKED);
        } else if (user.subscription &&
                typeof(user.subscription) == 'object' &&
                (
                    // user.subscription.role == roles.ROLE_SUPER_ADMIN ||
                    user.subscription.expiration > Date.now()
                )) {

            user.actions = roles.getActionsForRole(user.subscription.role);
        } else {
            user.actions = roles.getActionsForRole(roles.ROLE_USER);
        }

        return user;
    },

    validateUser: (email, password, callback) => {
        return module.exports.findUser(email, 'password')
            .then(user => {
                if (user) {
                    return bcrypt.compare(password, user.password)
                        .then(res => {
                            if (res) {
                                return Promise.resolve(user);
                            } else {
                                return Promise.resolve(false);
                            }
                        });
                } else {
                    return Promise.resolve(false);
                }
            });
    },

    createUser: (data) => {
        let password = data.password,
            userData = util.smartUpdate({}, data, WHITELIST);

        return bcrypt.hash(password, config.saltRounds)
            .then(hash => {
                userData.password = hash;
                return User.create(userData);
            });
    },

    /**
     * Get all of a user's purchases
     */
    purchases: (req, res) => {
        // let populate = {
        //     path: 'purchases',
        //     populate: {
        //         path: 'packages.package materials.materialItem'
        //     },
        //     options: {
        //         sort: 'date'
        //     }
        // };

        return Purchase.find({})
            .where('user').equals(req.user._id)
            .populate('team packages.package materials.material')
            .exec()
            .then(p => {
                res.json(p);
            })

    },

    teams: (req, res) => {
        return User.findOne({}).where('_id').equals(req.user._id)
            .select('memberOfTeams adminOfTeams')
            .populate({
                path: 'adminOfTeams memberOfTeams',
                populate: util.populations.team
            })
            .then(u => {
                res.json(u);
            })
    },

    // fetched with a GET call to /api/user/:_id/materials
    materials: (req, res) => {
        let userId = req.params.id,
            query = User.findOne({}).where('_id').equals(userId);

        return module.exports.collectMaterials(query, req, res);
    },

    collectMaterials: (query, req, res) => {
        return query.select('purchases')
            .populate({
                path: 'purchases',
                populate: {
                    path: 'materials.materialItem packages.package',
                    populate: {
                        path: 'materials packages',
                        populate: {
                            path: 'materials'
                            // lets only allow packages to include packages one level deep, because this is getting silly
                            // so a package that includes packages can't be included in a package
                        }
                    }
                }
            })
            .exec()
            .then(u => {
                let userData = u.toObject(),
                    packages = [],
                    materials = [],

                    // TODO: some day - instead of selecting it all at once to begin with, we can do this with a recursive function that selects a thing and then selects all of the materials / packages inside the thing?

                    addItems = array => {
                        if (array && array.length) {
                            array.forEach(arrayItem => {
                                let item = arrayItem.package || arrayItem;
                                if (item.name) {
                                    // if it has a name, it's a package
                                    // just add the data without adding the actual package because we don't want to cause any crazy recursiveness
                                    let packageData = {
                                        _id: item._id.toString(),
                                        slug: item.slug,
                                        name: item.name,
                                        color: item.color,
                                        price: item.price,
                                        dateAdded: item.dateAdded,
                                        dateModified: item.dateModified,
                                        description: item.description,
                                        materials: item.materials,
                                        packages: []
                                    };

                                    item.packages.forEach(p => {
                                        packageData.packages.push(p._id.toString());
                                    });

                                    packages = util.addToObjectIdArray(packages, packageData);
                                }
                                if (item.materials && item.materials.length) {
                                    item.materials.forEach(m => {
                                        materials = util.addToObjectIdArray(materials, m);
                                    });
                                }
                                addItems(item.packages);
                            });
                        }
                    };

                addItems(userData.purchases);

                packages = packages.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                materials = materials.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                })

                let data = {
                    packages: packages,
                    materials: materials
                }

                if (res) {
                    res.json(data);
                } else {
                    return Promise.resolve(data);
                }
            })
    },

    // fetchMaterials: (userId) => {
    //     return User.findOne({}).where('_id').equals(userId)
    //         .select('purchases')
    //         .populate({
    //             path: 'purchases',
    //             populate: {
    //                 path: 'materials packages'
    //             }
    //         })
    //         .exec()
    // },

    subscription: (req, res) => {
        return User.findOne({}).where('_id').equals(req.user._id)
            .select('subscription')
            .populate({
                path: 'subscription',
                select: '-stripeCustomerId',
                populate: {
                    path: 'parent',
                    select: '-stripeCustomerId',
                    populate: {
                        path: 'team',
                        select: 'name'
                    }
                }
            })
            .then(u => {
                let user = u.toObject();
                user.subscription.roleName = roles.findRoleById(user.subscription.role).name;

                res.json(user);
            })
    },

    backup: (req, res) => {
        User.find({}).exec().then(u => {
            res.json(u);
        });
    },

    validate: (req, res) => {
        let email = req.body.email,
            loggedInUser = req.user._id;

        let promise = User.findOne({}).where('email').equals(email);

        if (loggedInUser) {
            promise.where('_id').ne(loggedInUser);
        }
        
        return promise.exec()
            .then(u => {
                if (u) {
                    res.json({
                        conflict: 'email'
                    });
                } else {
                    res.json({});
                }
            });
    },

    // POST: /api/user/:_id/preference
    preference: (req, res) => {
        let userId = req.user._id,
            prefKey = req.body.key,
            prefVal = req.body.val;

        return User.findOne({})
            .where('_id').equals(userId.toString())
            .exec()
            .then(user => {
                return user.setPreference(prefKey, prefVal);
            }).then(user => {
                return module.exports.findUser(userId);
            }).then(user => {
                res.json(user);
            });

    },

    doesUserOwn: (user, materialId, packageId) => {
        let itemKey = materialId ? 'materials' : 'packages',
            searchId = materialId ? materialId : packageId;

        return module.exports.collectMaterials(User.findOne({}).where('_id').equals(user._id.toString()))
            .then(usersStuff => {
                if (util.indexOfObjectId(usersStuff[itemKey], searchId) > -1) {
                    // the user owns this item directly - woohoo!
                    return Promise.resolve(true);
                } else {
                    let teamIds = util.unionArrays(user.memberOfTeams, user.adminOfTeams),
                        checkTeamStuff = index => {
                            return userController.collectMaterials(Team.findOne({}).where('_id').equals(teamIds[index].toString()))
                                .then(stuff => {
                                    if (util.indexOfObjectId(stuff[itemKey], searchId) > -1) {
                                        // this team owns the item! hooray!
                                        return Promise.resolve(true);
                                    } else {
                                        // move on to the next one
                                        index++;
                                        if (teamIds[index]) {
                                            return checkTeamStuff(index);
                                        } else {
                                            return Promise.resolve(false);
                                        }
                                    }
                                })
                        }

                    return checkTeamStuff(0);
                }
            });
    }

}