import {AfterContentChecked, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {DiagramNodeService} from '../../services/diagram-node.service';

@Component({
    selector: 'app-processor-configs',
    templateUrl: './processor-configs.component.html',
    styleUrls: ['./processor-configs.component.scss'],
})
export class ProcessorConfigsComponent implements AfterContentChecked {
    @Input() public selectedProcessor: string = '';
    public processorName: string = '';
    public processorType: string = '';
    public hasChanged: boolean = false;

    public constructor() {}

    public ngAfterContentChecked(): void {
        if (this.selectedProcessor === '') {
            this.processorName = 'Pipeline Designer';
            this.processorType = '';
        } else {
            this.processorName = this.selectedProcessor.replace(',', ' ');
            this.processorType = this.selectedProcessor.split(',')[0];
        }
    }
}
