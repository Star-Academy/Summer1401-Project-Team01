import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-filter-config',
    templateUrl: './filter-config.component.html',
    styleUrls: ['./filter-config.component.scss'],
})
export class FilterConfigComponent {
    @Input() processorId: number = 0;

    public constructor() {}
}
