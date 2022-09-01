import {Component, Input} from '@angular/core';
import {ConfigsIfOnlyAndOnlyOptionsService} from '../../../../services/configs-if-only-and-only-options.service';
import {DiagramNodeService} from '../../../../services/diagram-node.service';
import {DATASET_GET_ALL_DATASETS} from '../../../../utilities/urls';

@Component({
    selector: 'app-join-config',
    templateUrl: './join-config.component.html',
    styleUrls: ['./join-config.component.scss'],
})
export class JoinConfigComponent {
    @Input() processorId: number = 0;
    public selectedDataset: string = '';
    public hasSelectedDataset: boolean = false;
    public selectedLeft: string = '';
    public selectedRight: string = '';
    public selectedJoinType: string = '';
    public joinTypes: string;

    public columns: string = '';
    public datasetColumns: string = '';
    public datasets: string = '';

    public constructor(
        private configsIfOnlyAndOnlyOptionsService: ConfigsIfOnlyAndOnlyOptionsService,
        private diagramNodeService: DiagramNodeService
    ) {
        this.joinTypes = 'Inner,Left,Right,Full';
        //TODO
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
        if (this.selectedDataset !== '') {
            this.hasSelectedDataset = true;
        }

        this.getDatasets().then((res) => (this.datasets = res));

        this.getColumns().then((res) => (this.columns = res));
    }

    public initializeConfigurations(configs: string) {
        let configsObject: any = {};
        try {
            configsObject = JSON.parse(configs);
        } catch (e) {
            console.log(e);
        }
        if (configsObject.hasOwnProperty('middleDatasetName')) this.selectedDataset = configsObject.middleDatasetName;
        if (configsObject.hasOwnProperty('leftVal')) this.selectedLeft = configsObject.leftVal;
        if (configsObject.hasOwnProperty('rightVal')) this.selectedRight = configsObject.rightVal;
        if (configsObject.hasOwnProperty('type'))
            this.selectedJoinType = this.joinTypeNumberToValue(configsObject.type);
    }

    public joinTypeNumberToValue(number: number): string {
        if (number == 0) return 'Inner';
        else if (number == 1) return 'Left';
        else if (number == 2) return 'Right';
        else if (number == 3) return 'Full';
        return '';
    }

    public joinTypeValueToNumber(value: string): number {
        if (value == 'Inner') return 0;
        else if (value == 'Left') return 1;
        else if (value == 'Right') return 2;
        else if (value == 'Full') return 3;
        return 0;
    }

    public exportConfigurations(): void {
        const configsObject = {
            middleDatasetName: this.selectedDataset,
            leftVal: this.selectedLeft,
            rightVal: this.selectedRight,
            type: this.joinTypeValueToNumber(this.selectedJoinType),
        };

        this.diagramNodeService.changeNodeOption(configsObject);
    }

    public getSelectedDataset(e: string) {
        this.selectedDataset = e;
        this.hasSelectedDataset = true;
        console.log(this.selectedDataset);

        this.getColumnsOfSelectedDataset().then((res) => {
            this.datasetColumns = res;
        });
    }

    public async getColumns(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getDatasetColumns();
    }

    public getSelectedLeftVal(e: string) {
        this.selectedLeft = e;
        console.log(this.selectedLeft);
    }

    public async getColumnsOfSelectedDataset(): Promise<string> {
        return await this.configsIfOnlyAndOnlyOptionsService.getSelectedDatasetColumns(this.selectedDataset);
    }

    public async getDatasets(): Promise<string> {
        const response = await fetch(DATASET_GET_ALL_DATASETS + '/admin');

        const data = await response.json();

        return await data.join(',');
    }

    public getSelectedRightVal(e: string) {
        this.selectedRight = e;
        console.log(this.selectedRight);
    }

    public getSelectedJoinType(e: string) {
        this.selectedJoinType = e;
        console.log(this.selectedJoinType);
    }
}
