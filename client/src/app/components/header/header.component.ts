import {AfterViewChecked, Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
    public constructor(private router: Router, private location: Location) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log(event.url);
                let path = event.url;
                if (path.startsWith('/pipeline-designer')) this.currentEnvTitle = this.PIPELINE_DESIGNER;
                else if (path.startsWith('/data-inventory')) this.currentEnvTitle = this.DATA_INVENTORY;
                //....
                else this.currentEnvTitle = this.SELECT_ENV;
            }
        });
    }

    private SELECT_ENV = 'Select Workspace';
    private DATA_INVENTORY = 'Data Inventory';
    private PIPELINE_DESIGNER = 'Pipeline Designer';

    public currentEnvTitle: string = this.SELECT_ENV;

    public async selectDataInventory(): Promise<void> {
        this.currentEnvTitle = this.DATA_INVENTORY;
        await this.router.navigateByUrl('/');
    }

    public async selectPipelineDesigner(): Promise<void> {
        this.currentEnvTitle = this.PIPELINE_DESIGNER;
        await this.router.navigateByUrl('pipeline-designer');
    }
}
