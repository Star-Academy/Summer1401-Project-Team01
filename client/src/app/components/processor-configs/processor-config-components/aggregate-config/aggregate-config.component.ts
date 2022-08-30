import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';

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

    public constructor(private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService) {
        this.aggregationTypes = 'Sum,Min,Max,Average,Count';
        //TODO
        const configsFromBack = '{"ColumnToBeGroupedBy" : "name", "OperationColumn" : "address","AggregationType" : 1}';
        this.initializeConfigurations(configsFromBack);
    }

    public initializeConfigurations(configs: string) {
        let configsObject: any = {};
        try {
            configsObject = JSON.parse(configs);
        } catch (e) {
            console.log(e);
        }
        if (configsObject.hasOwnProperty('AggregationType'))
            this.selectedAggregationType = this.aggregationTypeNumberToValue(configsObject.AggregationType);
        if (configsObject.hasOwnProperty('OperationColumn'))
            this.selectedOperationColumn = configsObject.OperationColumn;
        if (configsObject.hasOwnProperty('ColumnToBeGroupedBy'))
            this.selectedGroupColumn = configsObject.ColumnToBeGroupedBy;
    }

    public aggregationTypeNumberToValue(number: number) {
        if (number == 0) return 'Sum';
        else if (number == 1) return 'Min';
        else if (number == 2) return 'Max';
        else if (number == 3) return 'Average';
        else if (number == 4) return 'Count';
        return '';
    }

    // public exportConfigurations(): string {
    //     const configsObject: JSON = <JSON>(<any>{});
    // }

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
