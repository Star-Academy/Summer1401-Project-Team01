import {Component, OnInit} from '@angular/core';
import {ProcessorConfigsComponent} from '../../processor-configs.component';

@Component({
    selector: 'app-config-input',
    templateUrl: './config-input.component.html',
    styleUrls: ['./config-input.component.scss'],
})
export class ConfigInputComponent implements OnInit {
    public parentRef: ProcessorConfigsComponent | undefined;
    constructor() {}

    ngOnInit(): void {}
}
