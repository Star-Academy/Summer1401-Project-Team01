import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {DATASET_GET_ALL_DATASETS, DATASET_REMOVE, DATASET_SAMPLE, DOWNLOAD_FILE} from '../../utilities/urls';
import {UrlSerializer} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SnackbarService} from "../snackbar.service";
import {snackbarType} from "../../models/snackbar-type.enum";

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    constructor(private apiService: ApiService, private serializer: UrlSerializer, private snackbar: SnackbarService) {}

    public getDatasets(): any {
        return this.apiService.getRequest({url: `${DATASET_GET_ALL_DATASETS}/admin`}).then();
    }

    public deleteDataset(datasetName: string): any {
        let formData = new FormData();
        formData.append('datasetName', datasetName);
        formData.append('username', 'admin');
        fetch(DATASET_REMOVE, {body: formData, method: 'delete'}).then();
        this.snackbar.show("File deleted", snackbarType.WARNING);
    }

    public async getDownloadDataset(datasetName: string): Promise<void> {
        let params = new HttpParams();
        params = params.set('username', 'admin');
        params = params.set('datasetName', datasetName);
        let downloadUrl = DOWNLOAD_FILE + '?' + params.toString();
        const response = await fetch(downloadUrl , {method: 'post'});
        let path = await response.json();
        let startingPoint = await path.indexOf('\\server');
        console.log(path, startingPoint);
        let pathSlice = path.slice(startingPoint, path.length)
        console.log(pathSlice);
        await window.open(`http://127.0.0.1:8887${pathSlice}`);
        this.snackbar.show("File is downloading...", snackbarType.SUCCESS)
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
        //
    }
}
