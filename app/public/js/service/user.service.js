"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/toPromise");
var app_http_1 = require("../data/app-http");
var team_service_1 = require("./team.service");
var LoginResponse = (function () {
    function LoginResponse() {
    }
    return LoginResponse;
}());
var UserService = (function () {
    function UserService(http, teamService) {
        this.http = http;
        this.teamService = teamService;
        this.USER_STORAGE_KEY = 'improvplus_user';
        this.loginUrl = '/login';
        this.passwordRecoveryUrl = '/recoverPassword';
        this.passwordRecoveryTokenCheckUrl = '/checkPasswordToken';
        this.passwordChangeUrl = '/changePassword';
        this.logoutUrl = '/logout';
        this.refreshUrl = '/refreshToken';
        this.userUrl = '/api/user/';
        this.validateUrl = this.userUrl + 'validate';
        this.logginStateSource = new Rx_1.Subject();
        this.loginState$ = this.logginStateSource.asObservable();
        this.loadUserData();
    }
    UserService.prototype.loadUserData = function () {
        var data = localStorage.getItem(this.USER_STORAGE_KEY);
        if (data) {
            this.loggedInUser = JSON.parse(data);
        }
        else {
            this.loggedInUser = null;
        }
    };
    UserService.prototype.saveUserData = function (newUser) {
        this.loggedInUser = newUser;
        // don't save the password
        this.loggedInUser.password = "";
        localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(this.loggedInUser));
    };
    UserService.prototype.clearUserData = function () {
        this.loggedInUser = null;
        this._purchasePromise = null;
        this._subscriptionPromise = null;
        localStorage.removeItem(this.USER_STORAGE_KEY);
    };
    UserService.prototype.checkTokenExpiration = function () {
        if (!this.http.checkTokenExpiration()) {
            this.clearUserData();
            return false;
        }
        else {
            return true;
        }
    };
    UserService.prototype.announceLoginState = function () {
        this.logginStateSource.next(this.loggedInUser);
    };
    UserService.prototype.login = function (email, password) {
        var _this = this;
        this.isLoggingIn = true;
        this.loginPromise = this.http.post(this.loginUrl, {
            email: email,
            password: password
        }).toPromise()
            .then(function (response) { return _this._handleLoginRequest(response); });
        return this.loginPromise;
    };
    UserService.prototype.recoverPassword = function (email) {
        return this.http.post(this.passwordRecoveryUrl, {
            email: email
        }).toPromise()
            .then(function (response) {
            if (response.status == 200) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    UserService.prototype.checkPasswordRecoveryToken = function (token) {
        return this.http.post(this.passwordRecoveryTokenCheckUrl, {
            token: token
        }).toPromise()
            .then(function (response) {
            var data = response.json();
            if (data['message'] && data['message'] == 'Okay') {
                return true;
            }
            else {
                return false;
            }
        });
    };
    UserService.prototype.changePassword = function (token, password) {
        return this.http.post(this.passwordChangeUrl, {
            password: password,
            token: token
        }).toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    UserService.prototype.refreshToken = function () {
        var _this = this;
        if (this.checkTokenExpiration()) {
            this.isLoggingIn = true;
            this.loginPromise = this.http.post(this.refreshUrl, {})
                .toPromise()
                .then(function (response) { return _this._handleLoginRequest(response); });
            return this.loginPromise;
        }
    };
    UserService.prototype._handleLoginRequest = function (response) {
        var responseData = response.json();
        this.http.setToken(responseData.token, responseData.expires);
        this.saveUserData(responseData.user);
        this.isLoggingIn = false;
        this.announceLoginState();
        return this.loggedInUser;
    };
    UserService.prototype.logout = function () {
        var _this = this;
        return this.http.post(this.logoutUrl, {})
            .toPromise()
            .then(function () {
            _this.http.reset();
            _this.clearUserData();
            _this.announceLoginState();
            return true;
        });
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedInUser && true;
    };
    UserService.prototype.getLoggedInUser = function () {
        if (this.checkTokenExpiration()) {
            return this.loggedInUser;
        }
        else {
            return null;
        }
    };
    UserService.prototype.getAdminTeams = function () {
        return this.getLoggedInUser().adminOfTeams;
    };
    UserService.prototype.getTeams = function () {
        return this.getLoggedInUser().memberOfTeams;
    };
    UserService.prototype.getUserName = function () {
        return this.loggedInUser.firstName + ' ' + this.loggedInUser.lastName;
    };
    /**
     * Change information on the current user
     */
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return this.http.put(this.userUrl + this.loggedInUser._id, user)
            .toPromise()
            .then(function (response) {
            var user = response.json();
            _this.saveUserData(user);
            return _this.loggedInUser;
        });
    };
    UserService.prototype.setPreference = function (key, val) {
        var _this = this;
        return this.http.post(this.userUrl + this.loggedInUser._id + '/preference', {
            key: key,
            val: val
        }).toPromise()
            .then(function (response) {
            var user = response.json();
            _this.saveUserData(user);
            return _this.loggedInUser;
        });
    };
    UserService.prototype.getPreference = function (key) {
        var value = '';
        if (this.loggedInUser.preferences) {
            this.loggedInUser.preferences.forEach(function (pref) {
                if (pref.key == key) {
                    value = pref.value;
                }
            });
        }
        return value;
    };
    UserService.prototype.can = function (key) {
        if (!this.loggedInUser || !this.loggedInUser.actions || !this.loggedInUser.actions.length || this.isLocked()) {
            return false;
        }
        else {
            return this.loggedInUser.actions.indexOf(key) > -1;
        }
    };
    UserService.prototype.isAdminOfTeam = function (team) {
        return this.isUserAdminOfTeam(this.loggedInUser, team);
    };
    UserService.prototype.isUserAdminOfTeam = function (user, team) {
        if (!user || !team) {
            return false;
        }
        if (user.adminOfTeams[0]._id) {
            return user.adminOfTeams.findIndex(function (t) {
                return t._id === team._id;
            }) > -1;
        }
        else {
            return user.adminOfTeams.indexOf(team._id) > -1;
        }
    };
    UserService.prototype.isSuperAdmin = function () {
        return this.loggedInUser && this.loggedInUser.superAdmin;
    };
    UserService.prototype.isLocked = function () {
        return this.loggedInUser.locked;
    };
    UserService.prototype.isExpired = function () {
        return (new Date(this.loggedInUser.subscription.expiration)).getTime() <= Date.now();
    };
    UserService.prototype.validate = function (user) {
        return this.http.post(this.validateUrl, user)
            .toPromise()
            .then(function (response) {
            var data = response.json();
            if (data.conflict == 'email') {
                return 'That email address is already registered on ImprovPlus.';
            }
            else {
                return '';
            }
        });
    };
    UserService.prototype.fetchPurchases = function () {
        if (!this._purchasePromise) {
            this._purchasePromise = this.http.get(this.userUrl + this.loggedInUser._id + '/purchases')
                .toPromise()
                .then(function (response) {
                return response.json();
            });
        }
        return this._purchasePromise;
    };
    UserService.prototype.fetchSubscription = function () {
        if (!this._subscriptionPromise) {
            this._subscriptionPromise = this.http.get(this.userUrl + this.loggedInUser._id + '/subscription')
                .toPromise()
                .then(function (response) {
                return response.json();
            });
        }
        return this._subscriptionPromise;
    };
    UserService.prototype.fetchTeams = function () {
        var _this = this;
        if (!this._teamPromise) {
            this._teamPromise = this.http.get(this.userUrl + this.loggedInUser._id + '/teams')
                .toPromise()
                .then(function (response) {
                var user = response.json();
                _this.teamService.addTeams(user.adminOfTeams);
                _this.teamService.addTeams(user.memberOfTeams);
                return user;
            });
        }
        return this._teamPromise;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_http_1.AppHttp,
        team_service_1.TeamService])
], UserService);
exports.UserService = UserService;

//# sourceMappingURL=user.service.js.map
