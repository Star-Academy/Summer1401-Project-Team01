import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';

@Component({
    selector: 'app-filter-config',
    templateUrl: './filter-config.component.html',
    styleUrls: ['./filter-config.component.scss'],
})
export class FilterConfigComponent {
    @Input() processorId: number = 0;
    public filterOperations: string;
    public selectedColumn: string = '';
    public selectedOperator: string = '';
    public selectedValue: string = '';

    public constructor(private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService) {
        this.filterOperations = '=,>,<,!=,>=,<=,IS NULL,IS NOT NULL';
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
        if (configsObject.hasOwnProperty('columnName')) this.selectedColumn = configsObject.columnName;
        if (configsObject.hasOwnProperty('operator')) this.selectedOperator = configsObject.operator;
        if (configsObject.hasOwnProperty('value')) this.selectedValue = configsObject.value;
    }

    public exportConfigurations(): string {
        const configsObject: JSON = <JSON>(<any>{
            columnName: this.selectedColumn,
            operator: this.selectedOperator,
            value: this.selectedValue,
        });
        return JSON.stringify(configsObject);
    }

    public getColumns(): string {
        //TODO
        //get columns of current source from service from api
        return 'name,age,nationality,address,phone';
    }

    public getSelectedColumn(e: string) {
        this.selectedColumn = e;
        console.log(this.selectedColumn);
    }

    public getSelectedOperator(e: string) {
        this.selectedOperator = e;
        console.log(this.selectedOperator);
    }

    public getSelectedValue(e: string) {
        this.selectedValue = e;
        console.log(this.selectedValue);
    }
}
