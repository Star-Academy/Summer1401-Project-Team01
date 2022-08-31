import {Injectable} from '@angular/core';
import {DiagramNodeService} from './diagram-node.service';
import {DATASET_GET_ALL_COLUMNS} from '../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class ConfigsIfOnlyAndOnlyOptionsService {
    constructor(private diagramNodeService: DiagramNodeService) {
        this.getDatasetColumns().then();
    }

    public async getDatasetColumns(): Promise<string> {
        const formDataForGettingColumns = new FormData();

        if (!this.diagramNodeService.source) {
            return 'name,age,nationality,address,phone';
        }

        formDataForGettingColumns.append('datasetName', this.diagramNodeService.source);
        formDataForGettingColumns.append('username', 'admin');

        const response = await fetch(
            DATASET_GET_ALL_COLUMNS + '?datasetName=' + this.diagramNodeService.source + '&username=admin',
            {
                method: 'get',
            }
        );

        const data = await response.json();
        console.log(data);

        return await data.join(',');
    }

    public selectorToOption(selectedColumn: string[]): void {
        const option = {columns: selectedColumn};

        console.log(option);

        this.diagramNodeService.changeNodeOption(option);
    }

    public selectExportConfigurations(selectedColumns: string): string {
        const configsObject = {
            columns: [selectedColumns],
        };

        console.log(configsObject);

        return JSON.stringify(configsObject);
    }

    public selectPreviousSetting: any;
    public removePreviousSetting: any;
    public filterPreviousSetting: any;
    public aggregatePreviousSetting: any;
    public joinPreviousSetting: any;

    public setPreviousData(): void {
        this.selectPreviousSettingSetter();
        this.joinPreviousSettingSetter();
        this.removePreviousSettingSetter();
        this.aggregatePreviousSettingSetter();
        this.filterPreviousSettingSetter();
    }

    public selectPreviousSettingSetter(): any {
        if (!this.diagramNodeService.selectedNodeData?.name) return;
        else if (this.diagramNodeService.selectedNodeData.name !== 'Field selector') return;

        this.selectPreviousSetting =
            this.diagramNodeService.nodeDataArray[this.diagramNodeService.selectedNodeData.key].option;
    }
    public removePreviousSettingSetter(): any {
        if (!this.diagramNodeService.selectedNodeData?.name) return;
        else if (this.diagramNodeService.selectedNodeData.name !== 'Field remover') return;

        this.removePreviousSetting =
            this.diagramNodeService.nodeDataArray[this.diagramNodeService.selectedNodeData.key].option;
    }
    public filterPreviousSettingSetter(): any {
        if (!this.diagramNodeService.selectedNodeData?.name) return;
        else if (this.diagramNodeService.selectedNodeData.name !== 'Join') return;

        this.joinPreviousSetting =
            this.diagramNodeService.nodeDataArray[this.diagramNodeService.selectedNodeData.key].option;
    }
    public aggregatePreviousSettingSetter(): any {
        if (!this.diagramNodeService.selectedNodeData?.name) return;
        else if (this.diagramNodeService.selectedNodeData.name !== 'Aggregate') return;

        this.aggregatePreviousSetting =
            this.diagramNodeService.nodeDataArray[this.diagramNodeService.selectedNodeData.key].option;
    }
    public joinPreviousSettingSetter(): any {
        if (!this.diagramNodeService.selectedNodeData?.name) return;
        else if (this.diagramNodeService.selectedNodeData.name !== 'Filter') return;

        this.filterPreviousSetting =
            this.diagramNodeService.nodeDataArray[this.diagramNodeService.selectedNodeData.key].option;
    }
}
