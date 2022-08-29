import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
    template: '<a [routerLink]="[params.inRouterLink,params.value]"  (click)="navigate(params.inRouterLink)">{{params.value}}</a>'
})
export class RouterLinkRendererComponent implements AgRendererComponent {
    params: any;

    constructor(
        private ngZone: NgZone,
        private router: Router) { }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }

    // This was needed to make the link work correctly
    navigate(link: any) {
        this.ngZone.run(() => {
            this.router.navigate([link, this.params.value]);
        });
    }
}