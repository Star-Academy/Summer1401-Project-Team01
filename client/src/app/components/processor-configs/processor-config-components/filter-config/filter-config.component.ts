import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

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

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        this.filterOperations = '=,>,<,!=,>=,<=,IS NULL,IS NOT NULL';
        //TODO
        if (!!diagramNodeService.selectedNodeData?.key) {
            const configsFromBack = JSON.stringify(
                diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option
            );

            console.log(diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option);

            this.initializeConfigurations(configsFromBack);
        }
        this.initializeConfigurations('');
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
