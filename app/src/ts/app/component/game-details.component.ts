import { 
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }   from '@angular/common';

import { AppComponent } from "./app.component";

import { GameDatabaseService } from '../service/game-database.service';

import { Game, TagGame } from '../model/game';
import { Name } from '../model/name';
import { GameMetadata } from '../model/game-metadata';
import { Tag } from '../model/tag';
import { Note } from '../model/note';

import { Tool } from '../view/toolbar.view';

import { UserService } from "../service/user.service";

@Component({
    moduleId: module.id,
    selector: 'game-details',
    templateUrl: '../template/game-details.component.html',
    animations: [
        trigger('expand', [
            state('in', style({height: '*'})),
            transition('void => *', [
                style({height: 0}),
                animate(100)
            ]),
            transition('* => void', [
                style({height: '*'}),
                animate(100, style({height: 0}))
            ])
        ])
    ]
})
export class GameDetailsComponent implements OnInit, OnDestroy {

    @Input() game: Game;
    @Output() onClose: EventEmitter<Tool> = new EventEmitter();

    dialog: boolean = false;

    // tagMap: Object = {};
    notes: Note[] = [];

    namesOpen: boolean = false;

    editNameShown: boolean;
    addNameShown: boolean;

    editName: string;

    allPlayerCounts: GameMetadata[] = [];
    editPlayerCountShown: boolean;

    allDurations: GameMetadata[] = [];
    editDurationShown: boolean;

    addTagShown: boolean;
    newTagText: string;
    tagHints: Tag[];

    editDescriptionShown: boolean;
    newDescriptionText: string;

    createMetadataType: string;

    playerCountID: string;
    durationID: string;

    private tools: Tool[] = [
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

    constructor(
        private _app: AppComponent,
        private gameDatabaseService: GameDatabaseService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private userService: UserService
    ) { }

    ngOnInit(): void {

        if (!this.game) {
            this.route.params.forEach((params: Params) => {
                let id = params['id'];
                console.log(id);
                this.gameDatabaseService.getGame(id)
                    .then(game => this.setGame(game));
            });
        } else {
            this.dialog = true;
            this.setGame(this.game);
        }

    }

    ngOnDestroy(): void {

    }

    can(permission: string): boolean {
        return this.userService.can(permission);
    }

    private _getInput(name?:string): HTMLInputElement {
        name = name || 'editName';
        let i = <HTMLInputElement>document.querySelector('[name="' + name + '"]');
        return i;
    }

    private _focusInput(name?:string): void {

        // TODO: figure out how to focus the new input element - probably stupid complicated with Angular
        // http://stackoverflow.com/questions/34522306/angular-2-focus-on-newly-added-input-element

        // but hey, this works for now!
        setTimeout(() => {
            let i = this._getInput(name);
            if (i) {
                i.focus();
            }
        }, 100);
    }

    showEditName(): void {
        this._closeAllEdits();
        if (this.can('name_edit')) {
            if (!this.game.names.length) {
                this.showAddName();
            } else {
                this.editName = this.game.names[0].name;
                this.editNameShown = true;
                this._focusInput();
            }
        }
    }

    showAddName(): void {
        this._closeAllEdits();
        if (this.can('name_create')) {
            this.editName = "";
            this.addNameShown = true;
            this._focusInput();
        }
    }

    saveEditName(): void {
        if (this.editName) {
            if (this.editNameShown) {
                // update the existing name if it is different
                if (this.editName != this.game.names[0].name) {
                    this.game.names[0].name = this.editName;
                    this.gameDatabaseService.saveName(this.game.names[0]);
                }
            } else if (this.addNameShown) {
                // create a new name
                this.gameDatabaseService.createName(this.game._id, this.editName)
                    .then(name => {
                        this.game.names.unshift(name);
                    });
            }
        }

        this.editName = "";
        this._closeAllEdits();
    }

    private _closeAllEdits(): void {
        this.editNameShown = false;
        this.addNameShown = false;
        this.editPlayerCountShown = false;
        this.editDurationShown = false;
        this.addTagShown = false;
        this.editDescriptionShown = false;
    }

    private _saveGame(): void {
        this._closeAllEdits();
        this.setGame(this.game);

        this.gameDatabaseService.saveGame(this.game)
            .then((game) => {
                //this.setGame(game); not really necessary, because we already set it
            })
            .catch(() => {
                // TODO: revert?
            })
    }

    showEditPlayerCount(): void {
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allPlayerCounts.length) {
                this.gameDatabaseService.getPlayerCounts().then((playerCounts) => {
                    this.allPlayerCounts = playerCounts;
                });
            }
            this.editPlayerCountShown = !this.editPlayerCountShown;
        }
    }
    savePlayerCount(): void {
        if (this.can('game_edit')) {
            if (this.playerCountID) {
                this.gameDatabaseService.getPlayerCountById(this.playerCountID)
                    .then(playerCount => {
                        this.game.playerCount = playerCount;
                        this._saveGame();
                    });
            } else {
                // show the create player count dialog
                this.showCreateMetadataDialog("Player Count");
            }
        }
    }

    showEditDuration(): void {
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allDurations.length) {
                this.gameDatabaseService.getDurations().then((durations) => {
                    this.allDurations = durations
                });
            }
            this.editDurationShown = !this.editDurationShown;
        }
    }
    saveDuration(): void {
        if (this.can('game_edit')) {
            if (this.durationID) {
                this.gameDatabaseService.getDurationById(this.durationID)
                    .then(duration => {
                        this.game.duration = duration;
                        this._saveGame();
                    });
            } else {
                this.showCreateMetadataDialog("Duration");
            }
        }
    }

    showCreateMetadataDialog(type: string): void {
        if (this.can('metadata_create')) {
            this.createMetadataType = type;
        }
    }
    onCreateMetadataDone(metadata: GameMetadata): void {
        this.createMetadataType = "";

        if (metadata.type == 'playerCount') {
            this.allPlayerCounts.push(metadata);
            this.game.playerCount = metadata;
        } else if (metadata.type == 'duration') {
            this.allDurations.push(metadata);
            this.game.duration = metadata;
        }

        this._closeAllEdits();
        this.gameDatabaseService.saveGame(this.game);
    }

    showAddTag(): void {
        if (this.can('game_tag_add')) {
            this.addTagShown = true;

            this._focusInput('addTag');
        }
    }

    _tagTypeDebounce;
    _selectedTagIndex: number = -1;
    newTagKeyDown(event): void {

        let key = event.keyCode;

        switch(key) {
            case 13:
                this._selectedTagIndex = -1;

                this.addTagByName();
                break;
            case 27:
                this._selectedTagIndex = -1;

                this._closeAllEdits();
                break;
            case 40: // down
            case 38: // up

                if (key === 40) {
                    if (this._selectedTagIndex < this.tagHints.length - 1) {
                        this._selectedTagIndex++;
                    } else {
                        this._selectedTagIndex = 0;
                    }
                } else {
                    if (this._selectedTagIndex > 0) {
                        this._selectedTagIndex--;
                    } else {
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
                this._tagTypeDebounce = setTimeout(() => {
                    this.tagHints = [];
                    if (this.newTagText) {
                        this.gameDatabaseService.searchForTags(this.newTagText)
                            .then(tags => {
                                let max = tags.length > 8 ? 8 : tags.length;
                                for(let cnt = 0; cnt < max; cnt++) {
                                    let tag = tags[cnt];
                                    // only hint tags that aren't already added to this game,
                                    // and only show the first 8 hints, why not
                                    if (!this.gameDatabaseService.gameHasTag(this.game, [tag._id])) {
                                        this.tagHints.push(tag);
                                    }
                                }
                            });
                    }
                }, 100);
                break;
        }
    }

    removeTag(taggame: TagGame): void {
        if (!this.can('game_tag_remove')) {
            return;
        }
        let index = this.game.tags.indexOf(taggame);
        if (index > -1) {
            this.game.tags.splice(index, 1);
        }
        this.gameDatabaseService.deleteTagGame(this.game, taggame)
        .then(game => {
            this.setGame(game);  
        });
    }

    addTagByName(): void {
        let tag: Tag;
        // see if any of the hints match the input exactly
        this.tagHints.forEach(hint => {
            if (hint.name.toLocaleLowerCase() == this.newTagText.toLocaleLowerCase()) {
                tag = hint;
            }
        });

        if (tag) {
            this.addTag(tag);
        } else {
            // if there were no matches, we'll create a new tag
            this.gameDatabaseService.createTag(this.newTagText, this.game)
                .then(game => {
                    this.setGame(game);
                });
        }

        this.newTagText = "";
        this.tagHints = [];
        this._selectedTagIndex = -1;
    }

    addTag(tag: Tag): void {
        if (this.can('game_tag_add')) {
            this.gameDatabaseService.saveTagToGame(this.game, tag)
                .then(game => {
                    this.setGame(game);
                });
            
            this.newTagText = "";
            this.tagHints = [];
        }
    }

    showEditDescription(): void {
        this.newDescriptionText = this.game.description;
        this.editDescriptionShown = true;
    }

    saveDescription(): void {
        this.game.description = this.newDescriptionText;
        this.gameDatabaseService.saveGame(this.game);
        this._closeAllEdits();
    }

    setGame(game: Game): void {
        this.game = game;

        this.gameDatabaseService.getNotesForGame(this.game)
            .then((notes) => this.notes = notes);
    }

    closePage(): void {
        if (this.dialog) {
            this.onClose.emit();
        } else {
            this.router.navigate(['/games']);
        }
    }

    toggleNames(): void {
        this.namesOpen = !this.namesOpen;
    }

    onToolClicked(tool: Tool): void {
        switch (tool.name) {
            case "randomGame":
                if (this.dialog) {
                    this.onClose.emit(tool);
                } else {
                    this.router.navigate(['/games', {random: 'random'}]);
                }
                break;
            case "deleteGame":
                this._app.dialog("Delete Game?",
                    "Are you sure you want to delete this game. There is no turning back from this.",
                    "Delete",
                    () => {
                        this.gameDatabaseService.deleteGame(this.game)
                            .then(() => {
                                this.closePage();
                            })
                    });
                break;
        }
    }



}