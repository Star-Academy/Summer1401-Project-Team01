import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-processor-configs',
    templateUrl: './processor-configs.component.html',
    styleUrls: ['./processor-configs.component.scss'],
})
export class ProcessorConfigsComponent implements OnChanges {
    @Input() public selectedProcessor: string = '';
    public processorName: string = '';
    public processorType: string = '';
    public hasChanged: boolean = false;

    public constructor() {}

    public ngOnChanges(changes: SimpleChanges): void {
        this.processorType = this.selectedProcessor.split(', ')[0];
        this.processorName = 'my processor';
    }
}
