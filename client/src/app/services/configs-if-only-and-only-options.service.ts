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

    public async getDatasetColumns(): Promise<void> {
        const formDataForGettingColumns = new FormData();

        if (!this.diagramNodeService.source) {
            console.log('No source');
            return;
        }

        formDataForGettingColumns.append('datasetName', this.diagramNodeService.source);
        formDataForGettingColumns.append('username', 'admin');

        const response = await fetch(DATASET_GET_ALL_COLUMNS, {
            body: formDataForGettingColumns,
            method: 'get',
        });

        const data = await response;
        console.log(data);
    }
}
