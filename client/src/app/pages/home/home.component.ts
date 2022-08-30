import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public constructor(private router: Router) {}

    public async goDataInventory() {
        await this.router.navigateByUrl('data-inventory');
    }

    public async goPipelineList() {
        await this.router.navigateByUrl('pipeline-list');
    }
}
