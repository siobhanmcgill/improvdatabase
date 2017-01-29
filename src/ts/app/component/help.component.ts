import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AppComponent    } from './app.component';
import { Tool } from '../view/toolbar.view';

@Component({
    moduleId: module.id,
    selector: "help",
    templateUrl: "../template/help.component.html"
})
export class HelpComponent implements OnInit {

    title: string = '<span class="light">help</span>';

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    private _tools: Tool[] = [
    ]

    ngOnInit(): void {
    }

}