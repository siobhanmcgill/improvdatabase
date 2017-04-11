const 
 // DUDE DON'T CHANGE THESE NUMBERS DUDE
    ROLE_NOBODY = 0,
    ROLE_EXPIRED = 13, // no longer used
    ROLE_SUBSCRIBER = 1,
    ROLE_ULTIMATE = 2, // no longer used
    ROLE_USER = 3,
    ROLE_TEAM_SUBSCRIBER = 4,

    ROLE_FACILITATOR = 5,
    ROLE_FACILITATOR_TEAM = 6,
    ROLE_IMPROVISER = 7,
    ROLE_IMPROVISER_TEAM = 8,

    ROLE_SUPER_ADMIN = 19;

module.exports = {
    ROLE_EXPIRED: ROLE_EXPIRED,
    ROLE_NOBODY: ROLE_NOBODY,
    ROLE_USER: ROLE_USER,
    ROLE_SUBSCRIBER: ROLE_SUBSCRIBER,
    ROLE_TEAM_SUBSCRIBER: ROLE_TEAM_SUBSCRIBER,
    ROLE_ULTIMATE: ROLE_ULTIMATE,
    ROLE_SUPER_ADMIN: ROLE_SUPER_ADMIN,

    ROLE_FACILITATOR: ROLE_FACILITATOR,
    ROLE_FACILITATOR_TEAM: ROLE_FACILITATOR_TEAM,
    ROLE_IMPROVISER: ROLE_IMPROVISER,
    ROLE_IMPROVISER_TEAM: ROLE_IMPROVISER_TEAM,

    _actionCache: {},

    roles: [
        {
            id: ROLE_NOBODY,
            name: 'none',
            actions: [
                'package_view',
                'user_validate',
                'team_validate'
            ]
        },
        {
            id: ROLE_USER,
            name: 'user',
            inherits: [ROLE_NOBODY],
            actions: [
                'featurerequest_page_view',
                'featurerequest_send',
                'reportbug_page_view',
                'reportbug_send',
                'dashboard_page_view',
                'subscription_view',
                'account_edit', // editing oneself
                'subscription_renew'
            ]
        },
        {
            id: ROLE_SUBSCRIBER,
            name: "Subscriber",
            inherits: [ROLE_USER],
            actions: [
                'game_page_view',
                'game_view',
                'game_filter',

                'metadata_view',
                'tag_view',

                'note_view',
                'note_public_view',
                'note_private_create',
                'note_private_edit',

                'name_view',
                'name_vote',
                // 'name_create', let's not open this up just yet

                'community_page_view',
                'hire_page_view',
                'video_page_view',
                'glossary_page_view',

                'message_view',
                'message_create',

                'user_page_view', // viewing a user directory page (if that's ever a thing)
                'user_view', // viewing the list of users

                'team_page_view',
                'team_view', // get teams
                'team_create' // users can create teams!
            ]
        },
        {
            id: ROLE_TEAM_SUBSCRIBER,
            name: 'Team Member',
            inherits: [ROLE_SUBSCRIBER],
            actions: [
                'note_team_create',
                'note_team_view',

                'calendar_page_view',
                'calendar_view',
                'calendar_create', // this is just posting to the calendar API, not specifically creating calendars

                'team_subscription_invite', // user must be admin of the team
                'team_invite', // user has to be admin of team
                'team_edit', // user has to be admin of team
                'team_user_promote', // user has to be admin of team
                'team_leave'
            ]
        },
        {
            id: ROLE_FACILITATOR,
            name: 'Facilitator',
            inherits: [ROLE_SUBSCRIBER],
            actions: [
                'material_page_view',
                'material_view', // download material items that you own

                'blog_page_view',
                'blog_view',

                'coach_page_view',
                'coach_contact_send'
            ]
        },
        {
            id: ROLE_FACILITATOR_TEAM,
            name: 'Facilitator Team Member',
            inherits: [ROLE_FACILITATOR, ROLE_TEAM_SUBSCRIBER],
            actions: [
                // TDB
            ]
        },
        {
            id: ROLE_IMPROVISER,
            name: 'Improviser',
            inherits: [ROLE_SUBSCRIBER],
            actions: [
                'hire_apply_page_view', // view the page to apply to become a hireable
                'hire_apply' // apply to become a hireable
            ]
        },
        {
            id: ROLE_IMPROVISER_TEAM,
            name: 'Improv Team Member',
            inherits: [ROLE_IMPROVISER, ROLE_TEAM_SUBSCRIBER],
            actions: [
                // TDB
            ]
        },

        {
            id: ROLE_SUPER_ADMIN,
            name: "Super Admin",
            inherits: [ROLE_IMPROVISER_TEAM, ROLE_FACILITATOR_TEAM],
            actions: [
                'blog_create',
                'note_public_create',
                'note_public_edit',

                'user_lock',
                'user_edit',
                'user_delete',

                'game_create',
                'game_edit',
                'game_delete',

                'game_tag_add',
                'game_tag_remove',

                'name_create',
                'name_edit',
                'name_delete',

                'metadata_create',
                'metadata_edit',
                'metadata_delete',

                'tag_create',
                'tag_edit',
                'tag_delete',

                'material_edit',
                'material_create',
                'material_delete'
            ]
        }
    ],

    canUserHave: (url, method, user) => {
        method = method.toLowerCase();
        let action = findActionForUrl(url, method),
            val;

        if (typeof(action) === 'function') {
            val = action(url, method, user);

            if (typeof val !== 'string') {
                console.log('Action for ' + method + ':' + url + ' is a function');
                return val;
            }
        }
        if (val) {
            action = val;
        }
        
        if (action) {
            console.log('Action for ' + method + ':' + url + ' is ' + action);
            return module.exports.doesUserHaveAction(user, action);
        }
    },

    getActionsForRole: (roleId) => {
        if (!module.exports._actionCache['role_' + roleId]) {
            let actions = [];
            module.exports.roles.forEach(role => {
                if (role.id === parseInt(roleId, 10)) {
                    actions = union_arrays(actions, role.actions);
                    if (role.inherits && role.inherits.length) {
                        role.inherits.forEach(id => {
                            actions = union_arrays(actions, module.exports.getActionsForRole(id));
                        });
                    }
                }
            });
            module.exports._actionCache['role_' + roleId] = actions;
        }

        return module.exports._actionCache['role_' + roleId];
    },

    doesUserHaveAction: (user, action) => {
        if (!user) {
            return false;
        }
        let actions = user.actions;
        if (!actions) {
            actions = module.exports.getActionsForRole(user.RoleID);
        }
        if (!actions) {
            return false;
        }
        return actions.indexOf(action) > -1;
    }

}

const actionmap = {
    /**
     * if actions are mapped like this:
     *  get: 'op_view',
     *  post: 'op_create',
     *  put: 'op_edit',
     *  delete: 'op_delete'
     * 
     *  - where 'op' is the url fragment after api (i.e. for GET: /api/game, the op is 'game') -
     * 
     * You don't need to specify the mapping here, it will automatically map to those actions
     * 
     * So the /api/game route is automatically mapped to the following actions:
     * get: 'game_view',
     * post: 'game_create',
     * put: 'game_edit',
     * delete: 'game_delete'
     * 
     * Anything that doesn't fit this format (or that requires additional checking, can be mapped manually here)
     * 
     * Op can also be specified by using the 'base' property (/api/playerCount maps actions to "metadata_view" etc.)
     * 
     * The default property is used when the specific method is not specified. 
     * 
     * Any method (or default) can be mapped to a function (getting the URL, the method, and the user data)
     * which can manually check for access - it should return true if user has access to the requested route
     */

    // TODO: add name voting route here
    // tagGame: {
    //     get: 'tag_view',
    //     post: 'game_tag_add',
    //     put: 'game_tag_add',
    //     delete: 'game_tag_remove'
    // },
    game: {
        default: function(url, method, user) {
            switch(method) {
                case 'get':
                    return 'game_view';
                    break;
                case 'put':
                    return 'game_edit';
                    break;
                case 'delete':
                    if (url.indexOf('removeTag')) {
                        return 'game_tag_remove';
                    } else {
                        return 'game_delete';
                    }
                    break;
                case 'post':
                    if (url.indexOf('addTag')) {
                        return 'game_tag_add';
                    } else if (url.indexOf('removeTag')) {
                        return 'game_tag_remove';
                    } else if (url.indexOf('createTag')) {
                        return 'tag_create';
                    }
                    break;
            }
        }
    },
    duration: {
        base: 'metadata'
    },
    playerCount: {
        base: 'metadata'
    },
    note: {
        get: 'note_public_view',
        default: function(url, method, user) {
            switch(method) {
                case 'post':
                    // TODO: allow POST for private notes, when those are a thing
                    return 'note_public_create';
                    break;
                case 'put':
                    // TODO: allow PUT on a user's own notes
                    return 'note_public_edit';
                    break;
            }
        }
    },
    user: {
        default: function(url, method, user) {
            let admin;
            switch(method) {
                case "get":
                    admin = 'users_view';
                    break;
                case "put":
                    admin = 'users_edit';
                    break;
                case "delete":
                    admin = 'users_delete';
                    break;
                case "post":
                    if (url.indexOf('user/validate') > -1) {
                        admin = 'user_validate';
                    } else {
                        admin = 'users_create';
                    }
                    break;
                default:
                    admin = "nothing";
                    break;
            }

            // admins can view and edit anybody
            if (module.exports.doesUserHaveAction(user, admin)) {
                return true;
            } else if (url.indexOf('materials') > -1) {
                return url.indexOf('/user/' + user._id) > -1 &&
                        module.exports.doesUserHaveAction(user, 'material_view');
            } else {
                // users can view and edit themselves
                return url.indexOf('/user/' + user._id) > -1 &&
                        module.exports.doesUserHaveAction(user, 'account_edit');
            }
        }
    },
    team: {
        default: function(url, method, user) {
            let admin;
            switch(method) {
                case "get":
                    admin = 'team_view';
                    break;
                case "put":
                    admin = 'team_edit';
                    break;
                case "delete":
                    admin = 'team_delete';
                    break;
                case "post":
                    if (url.indexOf('team/validate') > -1) {
                        admin = 'team_validate';
                    } else {
                        admin = 'users_create';
                    }
                    break;
                default:
                    admin = "nothing";
                    break;
            }

            // admins can view and edit anybody
            if (module.exports.doesUserHaveAction(user, admin)) {
                return true;
            }

            // TODO: admins can edit a team
            // TODO: subscribers can view a team
            // TODO: members and admins can view a team's materials
        }
    },
    // TODO: add lock user route here
    // TODO: add video route here
    // TODO: add glossary route here
    // TODO: add blog route here
    // TODO: add messaging routes here
    default: {
        get: '',
        default: function(url, method, user) {
            // by default only allow non GET requests for super admins
            return user.superAdmin;
        }
    }
}

/**
 * Returns the action mapped to the specified URL and method
 */
findActionForUrl = function(url, method) {
    let op = url.replace(/\/api\/([a-z]*)\/?.*/i, '$1'),
        group = actionmap[op],
        action,
        fallback = actionmap.default[method] || actionmap.default.default;

    // /backup requests are restricted to super admins
    if (url.indexOf('/backup') > -1) {
        return function(url, method, user) {
            return user.superAdmin;
        }
    } else 
    // see if an action is specified for the given group and method
    if (group && (group[method] || group.default)) {
        return group[method] || group.default;
    } else {
        // we can try to assume the action from the operation and the method
        actionBase = (group && group.base) ? group.base : op;
        switch(method) {
            case 'get':
                action = 'view';
                break;
            case 'post':
                action = 'create';
                break;
            case 'put':
                action = 'edit';
                break;
            case 'delete':
                action = 'delete';
                break;
        }

        if (action) {
            return actionBase + '_' + action;
        }
    }

    return fallback;
}

function union_arrays (x, y) {
    var obj = {};
    for (var i = x.length-1; i >= 0; -- i) {
        obj[x[i]] = x[i];
    }
    for (var i = y.length-1; i >= 0; -- i) {
        obj[y[i]] = y[i];
    }
    var res = []
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            res.push(obj[k]);
        }
    }
    return res;
}