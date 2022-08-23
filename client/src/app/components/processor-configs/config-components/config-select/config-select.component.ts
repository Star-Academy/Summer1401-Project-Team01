import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-config-select',
    templateUrl: './config-select.component.html',
    styleUrls: ['./config-select.component.scss'],
})
export class ConfigSelectComponent {
    @Input() public inputTitle: string = 'Select';
    public constructor() {}
}
