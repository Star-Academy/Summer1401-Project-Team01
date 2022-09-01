import {Injectable} from '@angular/core';
import {DiagramNodeService} from './diagram-node.service';
import {DATASET_GET_ALL_COLUMNS, DATASET_GET_ALL_COLUMNS_AFTER_RUN} from '../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class ConfigsIfOnlyAndOnlyOptionsService {
    constructor(private diagramNodeService: DiagramNodeService) {
        this.getDatasetColumns().then();
    }

    public async getDatasetColumns(): Promise<string> {
        if (!this.diagramNodeService.source || !this.diagramNodeService.selectedNodeData?.key) {
            return 'name,age,nationality,address,phone';
        }

        if (this.diagramNodeService.selectedNodeData.key === 1) {
            const response = await fetch(
                DATASET_GET_ALL_COLUMNS + '?datasetName=' + this.diagramNodeService.source + '&username=admin',
                {
                    method: 'get',
                }
            );

            const data = await response.json();
            console.log(data);

            return await data.join(',');
        } else {
            if (this.diagramNodeService.pipelinePage === '') {
                return '';
            }
            const response = await fetch(
                DATASET_GET_ALL_COLUMNS_AFTER_RUN +
                    '?username=admin&pipelineName=' +
                    this.diagramNodeService.pipelinePage +
                    '&processId=' +
                    (this.diagramNodeService.selectedNodeData.key - 1),
                {
                    method: 'get',
                }
            );

            const data = await response.json();
            console.log(data);

            return await data.join(',');
        }
    }

    public async getSelectedDatasetColumns(datasetName: string): Promise<string> {
        const formDataForGettingColumns = new FormData();

        formDataForGettingColumns.append('datasetName', '');
        formDataForGettingColumns.append('username', 'admin');

        const response = await fetch(DATASET_GET_ALL_COLUMNS + '?datasetName=' + datasetName + '&username=admin', {
            method: 'get',
        });

        const data = await response.json();
        console.log(data);

        return await data.join(',');
    }
}
