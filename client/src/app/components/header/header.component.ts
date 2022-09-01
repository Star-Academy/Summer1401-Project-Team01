import {AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PipelineService} from '../../services/api/pipeline.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnChanges {
    public navigateTo: string = '';
    public pageName: string = '';
    public isAtHome: boolean = true;

    public constructor(private router: Router, private location: Location) {}

    public ngOnInit(): void {
        this.determineLink();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.determineLink();
    }

    public determineLink(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log(event.url);
                let path = event.url;
                if (path === '/') this.home();
                else if (path.startsWith('/data-inventory')) this.dataInventory();
                else if (path.startsWith('/pipeline-list')) this.pipelineList();
                else if (path.startsWith('/pipeline-designer')) this.pipelineDesigner();
            }
        });
    }

    public home(): void {
        this.navigateTo = '';
        this.pageName = '';
        this.isAtHome = true;
    }

    public dataInventory(): void {
        this.navigateTo = '/';
        this.pageName = 'Home';
        this.isAtHome = false;
    }

    public pipelineList(): void {
        this.navigateTo = '/data-inventory';
        this.pageName = 'Data Inventory';
        this.isAtHome = false;
    }

    public pipelineDesigner(): void {
        this.navigateTo = '/pipeline-list';
        this.pageName = 'Pipeline List';
        this.isAtHome = false;
    }
}
