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
var router_1 = require("@angular/router");
var app_component_1 = require("../../component/app.component");
var library_service_1 = require("../service/library.service");
var material_item_1 = require("../../model/material-item");
var user_service_1 = require("../../service/user.service");
var time_util_1 = require("../../util/time.util");
var app_http_1 = require("../../data/app-http");
var AdminComponent = (function () {
    function AdminComponent(_app, router, libraryService, userService, http) {
        this._app = _app;
        this.router = router;
        this.libraryService = libraryService;
        this.userService = userService;
        this.http = http;
        this.title = '<span class="light">super</span><strong>admin</strong>';
        this.tabs = [
            {
                name: 'Material Items',
                id: 'materials',
                icon: 'file'
            },
            {
                name: 'Utilities',
                id: 'utilities',
                icon: 'cogs'
            }
        ];
        this.selectedTab = 'materials';
        this._tools = [];
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.showMaterials();
    };
    AdminComponent.prototype.selectTab = function (tab) {
        this.selectedTab = tab.id;
    };
    AdminComponent.prototype.back = function () {
        this.selectedMaterial = null;
    };
    AdminComponent.prototype.simpleDate = function (date) {
        return time_util_1.TimeUtil.simpleDate(date);
    };
    AdminComponent.prototype.showMaterials = function () {
        var _this = this;
        this.libraryService.getAllMaterials()
            .then(function (materials) {
            _this._app.hideLoader();
            _this.materialItems = materials;
        });
    };
    AdminComponent.prototype.selectMaterial = function (material) {
        this.newVersion = new material_item_1.MaterialItemVersion();
        this.selectedMaterial = material;
    };
    AdminComponent.prototype.saveMaterial = function () {
        if (typeof (this.selectedMaterial.tags) == 'string') {
            var tags = this.selectedMaterial.tags;
            var tagArray_1 = [];
            tags.split(',').forEach(function (t) {
                tagArray_1.push(t.trim());
            });
            this.selectedMaterial.tags = tagArray_1;
        }
        this.libraryService.saveMaterial(this.selectedMaterial).then();
    };
    AdminComponent.prototype.fileChange = function () {
        this.newVersionFile = this.versionFileInput.files[0];
    };
    AdminComponent.prototype.saveVersion = function () {
        var _this = this;
        this.libraryService.postNewVersion(this.selectedMaterial._id, this.newVersion, this.newVersionFile).then(function (m) {
            _this.selectedMaterial.versions = m.versions;
            _this.userService.refreshToken();
        });
    };
    AdminComponent.prototype.deleteVersion = function (version) {
        var _this = this;
        this.libraryService.deleteVersion(this.selectedMaterial._id, version).then(function (m) {
            _this.selectedMaterial.versions = m.versions;
        });
    };
    AdminComponent.prototype.doBackup = function () {
        var _this = this;
        this.http.get('/api/backup').toPromise().then(function (response) {
            var data = response.json();
            _this._app.toast(data.timestamp);
        });
    };
    return AdminComponent;
}());
__decorate([
    core_1.ViewChild('versionFileInput', { read: HTMLInputElement }),
    __metadata("design:type", HTMLInputElement)
], AdminComponent.prototype, "versionFileInput", void 0);
AdminComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "admin",
        templateUrl: "../template/admin.component.html"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        library_service_1.LibraryService,
        user_service_1.UserService,
        app_http_1.AppHttp])
], AdminComponent);
exports.AdminComponent = AdminComponent;

//# sourceMappingURL=admin.component.js.map