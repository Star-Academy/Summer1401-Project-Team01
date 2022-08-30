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

        this.diagramNodeService.changeNodeOption(option);
    }

    public selectExportConfigurations(selectedColumns: string): string {
        const configsObject: JSON = <JSON>(<any>{
            columns: [selectedColumns],
        });

        console.log(selectedColumns);

        return JSON.stringify(configsObject);
    }
}
