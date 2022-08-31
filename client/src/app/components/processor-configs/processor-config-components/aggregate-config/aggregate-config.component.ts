import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';

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

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        this.aggregationTypes = 'Sum,Min,Max,Average,Count';
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
        if (configsObject.hasOwnProperty('AggregationType'))
            this.selectedAggregationType = this.aggregationTypeNumberToValue(configsObject.AggregationType);
        if (configsObject.hasOwnProperty('OperationColumn'))
            this.selectedOperationColumn = configsObject.OperationColumn;
        if (configsObject.hasOwnProperty('ColumnToBeGroupedBy'))
            this.selectedGroupColumn = configsObject.ColumnToBeGroupedBy;
    }

    public aggregationTypeNumberToValue(number: number): string {
        if (number == 0) return 'Sum';
        else if (number == 1) return 'Min';
        else if (number == 2) return 'Max';
        else if (number == 3) return 'Average';
        else if (number == 4) return 'Count';
        return '';
    }
    public aggregationTypeValueToNumber(value: string): number {
        if (value == 'Sum') return 0;
        else if (value == 'Min') return 1;
        else if (value == 'Max') return 2;
        else if (value == 'Average') return 3;
        else if (value == 'Count') return 4;
        return 0;
    }

    public exportConfigurations(): string {
        const configsObject: JSON = <JSON>(<any>{
            ColumnToBeGroupedBy: this.selectedGroupColumn,
            OperationColumn: this.selectedOperationColumn,
            AggregationType: this.aggregationTypeValueToNumber(this.selectedAggregationType),
        });
        return JSON.stringify(configsObject);
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
