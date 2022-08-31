import {Component, OnInit} from '@angular/core';
import {ProcessorConfigsComponent} from '../../processor-configs.component';

@Component({
    selector: 'app-config-number-input',
    templateUrl: './config-number-input.component.html',
    styleUrls: ['./config-number-input.component.scss'],
})
export class ConfigNumberInputComponent implements OnInit {
    public parentRef: ProcessorConfigsComponent | undefined;
    constructor() {}

    ngOnInit(): void {}
}
