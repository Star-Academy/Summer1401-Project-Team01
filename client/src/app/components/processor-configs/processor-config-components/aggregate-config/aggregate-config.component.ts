import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-aggregate-config',
    templateUrl: './aggregate-config.component.html',
    styleUrls: ['./aggregate-config.component.scss'],
})
export class AggregateConfigComponent {
    @Input() processorId: number = 0;
    public aggregationTypes: string;
    public selectedGroupColumn: string = '';
    public selectedOperationColumn: string = '';
    public selectedAggregationType: string = '';

    public constructor() {
        this.aggregationTypes = 'Sum,Min,Max,Average,Count';
    }

    public getColumns(): string {
        //TODO
        //get columns of current source from service from api
        return 'name,age,nationality,address,phone';
    }

    public getSelectedGroupColumn(e: string) {
        this.selectedGroupColumn = e;
        console.log(this.selectedGroupColumn);
    }

    public getSelectedOperationColumn(e: string) {
        this.selectedOperationColumn = e;
        console.log(this.selectedOperationColumn);
    }

    public getSelectedAggregationType(e: string) {
        this.selectedAggregationType = e;
        console.log(this.selectedAggregationType);
    }
}
