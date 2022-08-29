import {Component, OnInit} from '@angular/core';
import {ProcessorConfigsComponent} from '../../processor-configs.component';

@Component({
    selector: 'app-config-toggle',
    templateUrl: './config-toggle.component.html',
    styleUrls: ['./config-toggle.component.scss'],
})
export class ConfigToggleComponent implements OnInit {
    public parentRef: ProcessorConfigsComponent | undefined;
    constructor() {}

    ngOnInit(): void {}
}
