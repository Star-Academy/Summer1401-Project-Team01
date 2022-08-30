import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {DATASET_GET_ALL_DATASETS, DATASET_REMOVE, DATASET_SAMPLE, DOWNLOAD_FILE} from '../../utilities/urls';
import {UrlSerializer} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    constructor(private apiService: ApiService, private serializer: UrlSerializer) {}

    public getDatasets(): any {
        return this.apiService.getRequest({url: `${DATASET_GET_ALL_DATASETS}/admin`}).then();
    }

    public deleteDataset(datasetName: string): any {
        let formData = new FormData();
        formData.append('datasetName', datasetName);
        formData.append('username', 'admin');
        fetch(DATASET_REMOVE, {body: formData, method: 'delete'}).then();
    }

    public async getDownloadDataset(datasetName: string): Promise<string> {
        let params = new HttpParams();
        params = params.set('username', 'admin');
        params = params.set('datasetName', datasetName);

        let URL = DOWNLOAD_FILE + '?' + params.toString();

        const response = await fetch(URL , {method: 'post'});
        console.log(response);
        return response.json();
    }

    public async downloadDataset(url: string): Promise<void> {
        await fetch(url);
    }

    public async getRecords (datasetName: string, recordCount: number): Promise<any> {
        let formData = new FormData();
        formData.append('datasetName', datasetName );
        formData.append('username', 'admin');
        formData.append('count', `${recordCount}`);

        const response = await fetch(DATASET_SAMPLE, {body: formData, method: 'post'});
        return response.json();
    }
}
