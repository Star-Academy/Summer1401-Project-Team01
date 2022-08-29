import {AfterViewChecked, Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PipelineService} from '../../services/api/pipeline.service';

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
                if (path.startsWith('/pipeline-list')) this.currentEnvTitle = this.PIPELINE_LIST;
                else if (path.startsWith('/data-inventory')) this.currentEnvTitle = this.DATA_INVENTORY;
                else if (path.startsWith('/pipeline-designer')) this.currentEnvTitle = this.SELECT_ENV;
                //....
                else this.currentEnvTitle = this.SELECT_ENV;
            }
        });
    }

    private SELECT_ENV = 'Select Workspace';
    private DATA_INVENTORY = 'Data Inventory';
    private PIPELINE_LIST = 'Pipeline Designer';

    public currentEnvTitle: string = this.SELECT_ENV;

    public async selectDataInventory(): Promise<void> {
        this.currentEnvTitle = this.DATA_INVENTORY;
        await this.router.navigateByUrl('data-inventory');
    }

    public async selectPipelineList(): Promise<void> {
        this.currentEnvTitle = this.PIPELINE_LIST;
        await this.router.navigateByUrl('pipeline-list');
    }
}
