const mongoose = require('mongoose'),
    Promise = require('bluebird'),
    bcrypt = require('bcrypt');

var config = require('./config')();

const charge = require('./routes/charge'),
    roles = require('./roles');

const Subscription = require('./models/subscription.model');
const Purchase = require('./models/purchase.model');
const User = require('./models/user.model');
const MaterialItem = require('./models/material-item.model');
const Package = require('./models/package.model');

mongoose.Promise = Promise;
mongoose.connect(config.mongodb.uri);

function deleteUsers() {
    console.log('deleting users');
    return User.find({}).remove().exec();
}

function seedUsers() {
    const users = require('./models/seeds/user.seed.json');

    users.forEach(user => {
        let salt = bcrypt.genSaltSync(config.saltRounds),
            password = user.password;
        user.password = bcrypt.hashSync(password, salt);
    });

    return User.create(users)
        .then(() => {
            console.log('users seeded');
            console.log(' -- ');
        });
}

function deleteItems() {
    console.log('deleting material items');
    return MaterialItem.find({}).remove().exec();
}

function seedItems() {
    const materialItems = require('./models/seeds/material-item.seed.json');
    return MaterialItem.create(materialItems)
        .then(() => {
            console.log('items seeded');
            console.log(' -- ');
        });
}

function deletePackages() {
    console.log('deleting packages');
    return Package.find({}).remove().exec();
}

function seedPackages() {
    // manually create packages

    return Package.create({
        "slug": "ultimate",
        "name": "Improv+Ultimate",
        "description": "Gain access to all of our materials as well as our unbeatable hands-on support and coaching. The Ultimate package comes with your first year of access to the app for free.",
        "color": "red",
        "price": 1500
    }).then((improvNetworking) => {
        console.log('Created Improv+Networking');
        return improvNetworking.addMaterial([
            { name: "Improv+Leadership Facilitator's Guide" },
            { name: "Improv+Leadership Handouts" },
            { name: "Improv+Networking Facilitator's Guide" },
            { name: "Improv+Networking Handouts" },
            { name: "Facilitation Tips" },
            { name: "Handshake Academy" },
            { name: "Your Improv+Leadership ROI" }
        ]);
    }).then(() => {
        return Package.create({
            "slug": "subscription",
            "name": "App Subscription",
            "description": 'Gain access to the the app for one year',
            "price": 99
        });
    }).then((sub) => {
        console.log('Created Subscription package');
        console.log(' -- ');
    });

}

function deleteSubscriptions() {
    console.log('deleting subscriptions and purchases');
    return Subscription.find({}).remove().exec()
        .then(() => {
            return Purchase.find({}).remove().exec();
        }).then(() => {
            return User.find({}).exec();
        }).then(users => {
            let doUser = (userIndex) => {
                let u = users[userIndex];
                u.subscription = null;
                u.materials = [];
                u.purchases = [];
                return u.save()
                    .then(() => {
                        userIndex++;
                        if (userIndex < users.length) {
                            return doUser(userIndex);
                        } else {
                            console.log('user purchase data deleted');
                        }
                    })
            }
            return doUser(0);
        });
}

function seedPurchases(callback) {
    const expires = "2018-03-08T14:26:29.214Z";
    const expired = "2016-03-08T14:26:29.214Z";

    return Package.find({})
        .where('slug').equals('ultimate')
        .exec()
        .then(packages => {
            return User.find({})
                .where('email').in(['smcgill@denyconformity.com', 'kate@katebringardner.com'])
                .exec()
                .then(users => {
                    let purchaseArray = [];
                    packages.forEach((pack, i) => {
                        purchaseArray.push({
                            type: 'package',
                            total: 0,
                            package: packages[i]._id
                        });
                    });

                    let createSub = (userIndex) => {
                        return charge.createPurchase(users[userIndex], purchaseArray)
                            .then(() => {
                                userIndex++;
                                if (userIndex < users.length) {
                                    return createSub(userIndex);
                                } else {
                                    console.log('Purchases made for Shauvon and Kate');
                                    console.log(' -- ');
                                }
                            })
                    }

                    return createSub(0);

                });
        }).then(() => {
            // the expired user gets an expired subscription for testing!
            return User.findOne({})
                .where('email').equals('expireduser@improvpl.us')
                .exec();
        }).then(expiredUser => {
            let expiredDate = new Date();
            expiredDate.setFullYear(expiredDate.getFullYear() - 1);
            return expiredUser.addSubscription(roles.ROLE_SUBSCRIBER, expiredDate);
        });
}

module.exports = {

    resetUsers: function () {
        console.log("Re-seeding users. Hopefully you know what you're doing!");
        return deleteUsers()
            .then(seedUsers)
            .then(module.exports.resetPackages);
    },
    
    resetPackages: function () {
        console.log('Re-seeding packages and stuff');
        return deleteItems()
            .then(seedItems)
            .then(deletePackages)
            .then(seedPackages)
            .then(deleteSubscriptions)
            .then(seedPurchases)
            .then(() => {
                process.exit(0);
            });
    },

    clear: function() {
        return deleteItems()
            .then(deletePackages)
            .then(deleteSubscriptions)
            .then(() => {
                process.exit(0);
            });
    },

    checkForSeed: function() {
        return User.count({}).exec()
            .then(count => {
                if (count < 3) {
                    return this.resetUsers(true);
                }
            })
            .then(() => {
                return Package.count({}).exec()
            })
            .then(count => {
                if (count == 0) {
                    return this.resetPackages();
                } else {
                    process.exit(0);
                }
            });
    }

}