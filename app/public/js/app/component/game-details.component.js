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
var common_1 = require("@angular/common");
var app_component_1 = require("../../component/app.component");
var game_database_service_1 = require("../../service/game-database.service");
var game_1 = require("../../model/game");
var user_service_1 = require("../../service/user.service");
var GameDetailsComponent = (function () {
    function GameDetailsComponent(_app, gameDatabaseService, router, route, location, userService) {
        this._app = _app;
        this.gameDatabaseService = gameDatabaseService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.userService = userService;
        this.onClose = new core_1.EventEmitter();
        this.dialog = false;
        // tagMap: Object = {};
        this.notes = [];
        this.namesOpen = false;
        this.allPlayerCounts = [];
        this.allDurations = [];
        this.tools = [
            {
                icon: "fa-trash",
                name: "deleteGame",
                text: "Delete Game",
                permission: "game_delete"
            },
            {
                icon: "fa-random",
                name: "randomGame",
                text: "Select Random Game",
                active: false
            }
        ];
        this._selectedTagIndex = -1;
    }
    GameDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.game) {
            this.route.params.forEach(function (params) {
                var id = params['id'];
                _this.gameDatabaseService.getGame(id)
                    .then(function (game) { return _this.setGame(game); });
            });
        }
        else {
            this.dialog = true;
            this.setGame(this.game);
        }
    };
    GameDetailsComponent.prototype.ngOnDestroy = function () {
    };
    GameDetailsComponent.prototype.can = function (permission) {
        return this.userService.can(permission);
    };
    GameDetailsComponent.prototype._getInput = function (name) {
        name = name || 'editName';
        var i = document.querySelector('[name="' + name + '"]');
        return i;
    };
    GameDetailsComponent.prototype._focusInput = function (name) {
        // TODO: figure out how to focus the new input element - probably stupid complicated with Angular
        // http://stackoverflow.com/questions/34522306/angular-2-focus-on-newly-added-input-element
        var _this = this;
        // but hey, this works for now!
        setTimeout(function () {
            var i = _this._getInput(name);
            if (i) {
                i.focus();
            }
        }, 100);
    };
    GameDetailsComponent.prototype.showEditName = function () {
        this._closeAllEdits();
        if (this.can('name_edit')) {
            if (!this.game.names.length) {
                this.showAddName();
            }
            else {
                this.editName = this.game.names[0].name;
                this.editNameShown = true;
                this._focusInput();
            }
        }
    };
    GameDetailsComponent.prototype.showAddName = function () {
        this._closeAllEdits();
        if (this.can('name_create')) {
            this.editName = "";
            this.addNameShown = true;
            this._focusInput();
        }
    };
    GameDetailsComponent.prototype.saveEditName = function () {
        var _this = this;
        if (this.editName) {
            if (this.editNameShown) {
                // update the existing name if it is different
                if (this.editName != this.game.names[0].name) {
                    this.game.names[0].name = this.editName;
                    this.gameDatabaseService.saveName(this.game.names[0]);
                }
            }
            else if (this.addNameShown) {
                // create a new name
                this.gameDatabaseService.createName(this.game._id, this.editName)
                    .then(function (name) {
                    _this.game.names.unshift(name);
                });
            }
        }
        this.editName = "";
        this._closeAllEdits();
    };
    GameDetailsComponent.prototype._closeAllEdits = function () {
        this.editNameShown = false;
        this.addNameShown = false;
        this.editPlayerCountShown = false;
        this.editDurationShown = false;
        this.addTagShown = false;
        this.editDescriptionShown = false;
    };
    GameDetailsComponent.prototype._saveGame = function () {
        this._closeAllEdits();
        this.setGame(this.game);
        this.gameDatabaseService.saveGame(this.game)
            .then(function (game) {
            //this.setGame(game); not really necessary, because we already set it
        })
            .catch(function () {
            // TODO: revert?
        });
    };
    GameDetailsComponent.prototype.showEditPlayerCount = function () {
        var _this = this;
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allPlayerCounts.length) {
                this.gameDatabaseService.getPlayerCounts().then(function (playerCounts) {
                    _this.allPlayerCounts = playerCounts;
                });
            }
            this.editPlayerCountShown = !this.editPlayerCountShown;
        }
    };
    GameDetailsComponent.prototype.savePlayerCount = function () {
        var _this = this;
        if (this.can('game_edit')) {
            if (this.playerCountID) {
                this.gameDatabaseService.getPlayerCountById(this.playerCountID)
                    .then(function (playerCount) {
                    _this.game.playerCount = playerCount;
                    _this._saveGame();
                });
            }
            else {
                // show the create player count dialog
                this.showCreateMetadataDialog("Player Count");
            }
        }
    };
    GameDetailsComponent.prototype.showEditDuration = function () {
        var _this = this;
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allDurations.length) {
                this.gameDatabaseService.getDurations().then(function (durations) {
                    _this.allDurations = durations;
                });
            }
            this.editDurationShown = !this.editDurationShown;
        }
    };
    GameDetailsComponent.prototype.saveDuration = function () {
        var _this = this;
        if (this.can('game_edit')) {
            if (this.durationID) {
                this.gameDatabaseService.getDurationById(this.durationID)
                    .then(function (duration) {
                    _this.game.duration = duration;
                    _this._saveGame();
                });
            }
            else {
                this.showCreateMetadataDialog("Duration");
            }
        }
    };
    GameDetailsComponent.prototype.showCreateMetadataDialog = function (type) {
        if (this.can('metadata_create')) {
            this.createMetadataType = type;
        }
    };
    GameDetailsComponent.prototype.onCreateMetadataDone = function (metadata) {
        this.createMetadataType = "";
        if (metadata.type == 'playerCount') {
            this.allPlayerCounts.push(metadata);
            this.game.playerCount = metadata;
        }
        else if (metadata.type == 'duration') {
            this.allDurations.push(metadata);
            this.game.duration = metadata;
        }
        this._closeAllEdits();
        this.gameDatabaseService.saveGame(this.game);
    };
    GameDetailsComponent.prototype.showAddTag = function () {
        if (this.can('game_tag_add')) {
            this.addTagShown = true;
            this._focusInput('addTag');
        }
    };
    GameDetailsComponent.prototype.newTagKeyDown = function (event) {
        var _this = this;
        var key = event.keyCode;
        switch (key) {
            case 13:
                this._selectedTagIndex = -1;
                this.addTagByName();
                break;
            case 27:
                this._selectedTagIndex = -1;
                this._closeAllEdits();
                break;
            case 40: // down
            case 38:
                if (key === 40) {
                    if (this._selectedTagIndex < this.tagHints.length - 1) {
                        this._selectedTagIndex++;
                    }
                    else {
                        this._selectedTagIndex = 0;
                    }
                }
                else {
                    if (this._selectedTagIndex > 0) {
                        this._selectedTagIndex--;
                    }
                    else {
                        this._selectedTagIndex = this.tagHints.length - 1;
                    }
                }
                if (this.tagHints[this._selectedTagIndex]) {
                    this.newTagText = this.tagHints[this._selectedTagIndex].name;
                    this._focusInput('addTag');
                }
                break;
            default:
                clearTimeout(this._tagTypeDebounce);
                this._tagTypeDebounce = setTimeout(function () {
                    _this.tagHints = [];
                    if (_this.newTagText) {
                        _this.gameDatabaseService.searchForTags(_this.newTagText)
                            .then(function (tags) {
                            var max = tags.length > 8 ? 8 : tags.length;
                            for (var cnt = 0; cnt < max; cnt++) {
                                var tag = tags[cnt];
                                // only hint tags that aren't already added to this game,
                                // and only show the first 8 hints, why not
                                if (!_this.gameDatabaseService.gameHasTag(_this.game, [tag._id])) {
                                    _this.tagHints.push(tag);
                                }
                            }
                        });
                    }
                }, 100);
                break;
        }
    };
    GameDetailsComponent.prototype.removeTag = function (taggame) {
        if (!this.can('game_tag_remove')) {
            return;
        }
        var index = this.game.tags.indexOf(taggame);
        console.log('removing tag', taggame, 'index: ', index);
        if (index > -1) {
            this.game.tags.splice(index, 1);
        }
        this.gameDatabaseService.deleteTagGame(this.game, taggame);
        // .then(game => {
        //     this.setGame(game);  
        // });
    };
    GameDetailsComponent.prototype.addTagByName = function () {
        var _this = this;
        var tag;
        // see if any of the hints match the input exactly
        this.tagHints.forEach(function (hint) {
            if (hint.name.toLocaleLowerCase() == _this.newTagText.toLocaleLowerCase()) {
                tag = hint;
            }
        });
        if (tag) {
            this.addTag(tag);
        }
        else {
            // if there were no matches, we'll create a new tag
            this.gameDatabaseService.createTag(this.newTagText, this.game)
                .then(function (taggame) {
                _this.game.tags.unshift(taggame);
            });
        }
        this.newTagText = "";
        this.tagHints = [];
        this._selectedTagIndex = -1;
    };
    GameDetailsComponent.prototype.addTag = function (tag) {
        var _this = this;
        if (this.can('game_tag_add')) {
            this.gameDatabaseService.saveTagToGame(this.game, tag)
                .then(function (taggame) {
                _this.game.tags.unshift(taggame);
            });
            this.newTagText = "";
            this.tagHints = [];
        }
    };
    GameDetailsComponent.prototype.showEditDescription = function () {
        this.newDescriptionText = this.game.description;
        this.editDescriptionShown = true;
    };
    GameDetailsComponent.prototype.saveDescription = function () {
        this.game.description = this.newDescriptionText;
        this.gameDatabaseService.saveGame(this.game);
        this._closeAllEdits();
    };
    GameDetailsComponent.prototype.setGame = function (game) {
        var _this = this;
        this.game = game;
        this.durationID = this.game.duration._id;
        this.playerCountID = this.game.playerCount._id;
        this.gameDatabaseService.getNotesForGame(this.game)
            .then(function (notes) { return _this.notes = notes; });
    };
    GameDetailsComponent.prototype.closePage = function () {
        console.log('dialog?', this.dialog);
        if (this.dialog) {
            this.onClose.emit();
        }
        else {
            this.router.navigate(['/app/games']);
        }
    };
    GameDetailsComponent.prototype.toggleNames = function () {
        this.namesOpen = !this.namesOpen;
    };
    GameDetailsComponent.prototype.onToolClicked = function (tool) {
        var _this = this;
        switch (tool.name) {
            case "randomGame":
                if (this.dialog) {
                    this.onClose.emit(tool);
                }
                else {
                    this.router.navigate(['/games', { random: 'random' }]);
                }
                break;
            case "deleteGame":
                this._app.dialog("Delete Game?", "Are you sure you want to delete this game. There is no turning back from this.", "Delete", function () {
                    _this.gameDatabaseService.deleteGame(_this.game)
                        .then(function () {
                        _this.closePage();
                    });
                });
                break;
        }
    };
    return GameDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], GameDetailsComponent.prototype, "game", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GameDetailsComponent.prototype, "onClose", void 0);
GameDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'game-details',
        templateUrl: '../template/game-details.component.html',
        animations: [
            core_1.trigger('expand', [
                core_1.state('in', core_1.style({ height: '*' })),
                core_1.transition('void => *', [
                    core_1.style({ height: 0 }),
                    core_1.animate(100)
                ]),
                core_1.transition('* => void', [
                    core_1.style({ height: '*' }),
                    core_1.animate(100, core_1.style({ height: 0 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        game_database_service_1.GameDatabaseService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location,
        user_service_1.UserService])
], GameDetailsComponent);
exports.GameDetailsComponent = GameDetailsComponent;

//# sourceMappingURL=game-details.component.js.map