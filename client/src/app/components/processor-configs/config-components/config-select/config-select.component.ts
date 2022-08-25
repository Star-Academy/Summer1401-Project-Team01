import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-config-select',
    templateUrl: './config-select.component.html',
    styleUrls: ['./config-select.component.scss'],
})
export class ConfigSelectComponent {
    @Input() public inputTitle: string = '';
    @Input() public inputOptions: string[] = [];
    @Input() public inputRequired: boolean = false;
    @Input() public inputPlaceHolder: string = '';
    @Input() public inputValue: string = '';

    public constructor() {}
}
