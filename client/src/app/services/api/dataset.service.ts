import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {DATASET_GET_ALL_DATASETS, DATASET_REMOVE, DOWNLOAD_FILE} from '../../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    constructor(private apiService: ApiService) {}

    public getDatasets(): any {
        return this.apiService.getRequest({url: `${DATASET_GET_ALL_DATASETS}/admin`}).then();
    }

    public deleteDataset(datasetName: string): any {
        let formData = new FormData();
        formData.append('datasetName', datasetName);
        formData.append('username', 'admin');
        fetch(DATASET_REMOVE, {body: formData, method: 'post'}).then();

        //this.apiService.postRequest({url: DATASET_REMOVE, body: {username: 'admin', datasetName: datasetName}}).then()
    }

    public async getDownloadDataset(datasetName: string): Promise<any> {
        let formData = new FormData();
        formData.append('datasetName', datasetName);
        formData.append('username', 'admin');
        // return await fetch(DOWNLOAD_FILE, {body: formData, method: 'post'}).then()

        //this.apiService.postRequest({url: DATASET_REMOVE, body: {username: 'admin', datasetName: datasetName}}).then()
    }

    public async downloadDataset(url: string): Promise<void> {
        await fetch(url);
    }
}
