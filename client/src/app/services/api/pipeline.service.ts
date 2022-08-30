import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {DATASET_GET_ALL_DATASETS, PIPELINE_GET_ALL_PIPELINE_NAMES} from '../../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public constructor(private apiService: ApiService) {}

    public async getAllPipelineNames(): Promise<any> {
        return this.apiService.getRequest({url: `${PIPELINE_GET_ALL_PIPELINE_NAMES}/admin`}).then();
    }
}
