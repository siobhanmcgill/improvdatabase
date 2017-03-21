"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var iplus_view_1 = require("../view/iplus.view");
var login_view_1 = require("../view/login.view");
// services
var game_database_service_1 = require("../service/game-database.service");
var library_service_1 = require("../service/library.service");
var user_service_1 = require("../service/user.service");
var auth_guard_service_1 = require("../service/auth-guard.service");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule
        ],
        declarations: [
            iplus_view_1.IPlusView,
            login_view_1.LoginView
        ],
        exports: [
            iplus_view_1.IPlusView,
            login_view_1.LoginView
        ],
        providers: [
            game_database_service_1.GameDatabaseService,
            library_service_1.LibraryService,
            user_service_1.UserService,
            auth_guard_service_1.AuthGuard
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;

//# sourceMappingURL=shared.module.js.map