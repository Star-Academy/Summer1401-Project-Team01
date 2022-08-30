import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {slider} from "./animations/route-animations";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slider]
})
export class AppComponent {
    public prepareRoute(outlet: RouterOutlet): any {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    }
}
