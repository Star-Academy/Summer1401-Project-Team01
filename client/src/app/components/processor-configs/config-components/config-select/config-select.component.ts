import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProcessorConfigsComponent} from '../../processor-configs.component';

@Component({
    selector: 'app-config-select',
    templateUrl: './config-select.component.html',
    styleUrls: ['./config-select.component.scss'],
})
export class ConfigSelectComponent {
    @Input() public inputTitle: string = '';
    @Input() public inputOptions: string = '';
    @Input() public inputRequired: string = 'false';
    @Input() public inputPlaceHolder: string = '';
    @Input() public inputMultiple: string = 'false';
    @Input() public inputValue: string = '';
    @Output() public inputValueChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() public processorId: number = 0;

    public constructor() {}

    public update(inputValue: string) {
        // @ts-ignore
        this.inputValueChange.emit(inputValue);
    }
}
