import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
    public constructor(private router: Router) {}
    public currentEnvTitle: string = 'انتخاب محیط کار';

    public async selectDataInventory(): Promise<void> {
        this.currentEnvTitle = 'فهرست دادگان‌ها';
        await this.router.navigateByUrl('/');
    }

    public async selectPipelineDesigner(): Promise<void> {
        this.currentEnvTitle = 'مدیریت پایپلاین‌ها';
        await this.router.navigateByUrl('pipeline-designer');
    }
}
