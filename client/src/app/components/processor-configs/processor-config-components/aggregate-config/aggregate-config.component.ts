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

    public columns: string = '';

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        this.aggregationTypes = 'Sum,Min,Max,Average,Count';
        if (
            !!diagramNodeService.selectedNodeData?.key &&
            !!diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData.key].option
        ) {
            const configsFromBack = JSON.stringify(
                diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData.key].option
            );

            console.log(diagramNodeService.nodeDataArray[diagramNodeService.selectedNodeData?.key].option);

            this.initializeConfigurations(configsFromBack);
        }
        this.initializeConfigurations('');

        this.getColumns().then((res) => (this.columns = res));
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

    public exportConfigurations(): void {
        const configsObject = {
            ColumnToBeGroupedBy: this.selectedGroupColumn,
            OperationColumn: this.selectedOperationColumn,
            AggregationType: this.aggregationTypeValueToNumber(this.selectedAggregationType),
        };

        this.diagramNodeService.changeNodeOption(configsObject);
    }

    public async getColumns(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns();
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
