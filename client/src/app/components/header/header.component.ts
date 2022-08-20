import {Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
    public constructor(private router: Router, private location: Location) {
        let path = this.location.path();
        if (path.startsWith('/pipeline-designer')) this.currentEnvTitle = this.PIPELINE_DESIGNER;
        else if (path.startsWith('/data-inventory')) this.currentEnvTitle = this.DATA_INVENTORY;
    }

    private SELECT_ENV = 'انتخاب محیط کار';
    private DATA_INVENTORY = 'فهرست دادگان‌ها';
    private PIPELINE_DESIGNER = 'مدیریت پایپلاین‌ها';

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
