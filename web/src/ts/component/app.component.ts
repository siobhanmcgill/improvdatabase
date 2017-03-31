import {
    Component,
    OnInit
} from '@angular/core';
import 'rxjs/Subject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../template/app.component.html',
    animations: [
    ]
})
export class AppComponent implements OnInit {

    scrollpos: number = 0;

    loader = document.getElementById("siteLoader");
    loaderVisible: boolean = true;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.hideLoader();
    }
    
    onScroll($event): void {
        this.scrollpos = $event.target.scrollingElement.scrollTop;
    }

    showLoader(): void {
        this.loader.style.display = "block";
        this.loaderVisible = true;
    }

    hideLoader(): void {
        this.loader.style.display = "none";
        this.loaderVisible = false;
    }
    
}