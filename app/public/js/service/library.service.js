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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var user_service_1 = require("./user.service");
var LibraryService = (function () {
    function LibraryService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.subscriptionUrl = '/api/subscription';
        this.materialsUrl = '/api/material/';
        this.ownedMaterialsUrl = '/api/user/:_id/materials';
    }
    LibraryService.prototype.getOwnedMaterials = function () {
        var user = this.userService.getLoggedInUser();
        if (user) {
            if (user.materials && user.materials.length) {
                this._materialPromise = new Promise(function (res, rej) {
                    res(user.materials);
                });
            }
            else {
                this._materialPromise = this._getOwnedMaterials();
            }
        }
        else {
            this._materialPromise = new Promise(function (res, rej) {
                rej("No user");
            });
        }
        return this._materialPromise;
    };
    LibraryService.prototype._getOwnedMaterials = function () {
        var url = this.ownedMaterialsUrl.replace(':_id', this.userService.getLoggedInUser()._id);
        return this.http.get(url, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    LibraryService.prototype.downloadMaterial = function (id) {
        this.http.get(this.materialsUrl + id, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            var url = response.json().url;
            window.open(location.origin + url);
        });
    };
    LibraryService.prototype.getLatestVersionForMaterialItem = function (m) {
        m.versions.sort(function (a, b) {
            return b.ver - a.ver;
        });
        return m.versions[0];
    };
    // private _packagePromise: Promise<Package[]>;
    // getPackages(): Promise<Package[]> {
    //     if (!this._packagePromise) {
    //         this._packagePromise = this.http.get(this.packageUrl, this.userService.getAuthorizationHeader())
    //             .toPromise()
    //             .then(response => {
    //                 this.packages = response.json() as Package[];
    //                 return this.packages;
    //             })
    //             .catch(this.handleError);
    //     } 
    //     return this._packagePromise;
    // }
    // getOwnedPackages(): Promise<Package[]> {
    //     return new Promise<Package[]>((resolve, reject) => {
    //         this.getPackages().then(packages => {
    //             let owned: Package[] = [];
    //             packages.forEach(p => {
    //                 if (p.Owned) {
    //                     owned.push(p);
    //                 }
    //                 resolve(owned);
    //             })
    //         })
    //     });
    // }
    // private _materialsPromise: Promise<MaterialItem[]>;
    // getMaterials(): Promise<MaterialItem[]> {
    //     if (!this._materialsPromise) {
    //         this._materialsPromise = this.http.get(this.materialsUrl, this.userService.getAuthorizationHeader())
    //             .toPromise()
    //             .then(response => {
    //                 this.materials = response.json() as MaterialItem[];
    //                 return this.materials;
    //             })
    //             .catch(this.handleError);
    //     } 
    //     return this._materialsPromise;
    // }
    LibraryService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    return LibraryService;
}());
LibraryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        user_service_1.UserService])
], LibraryService);
exports.LibraryService = LibraryService;

//# sourceMappingURL=library.service.js.map
