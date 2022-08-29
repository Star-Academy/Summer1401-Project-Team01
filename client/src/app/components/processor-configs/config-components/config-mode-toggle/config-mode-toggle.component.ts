import {Component, OnInit} from '@angular/core';
import {ProcessorConfigsComponent} from '../../processor-configs.component';

@Component({
    selector: 'app-config-mode-toggle',
    templateUrl: './config-mode-toggle.component.html',
    styleUrls: ['./config-mode-toggle.component.scss'],
})
export class ConfigModeToggleComponent implements OnInit {
    public parentRef: ProcessorConfigsComponent | undefined;
    constructor() {}

    ngOnInit(): void {}
}
