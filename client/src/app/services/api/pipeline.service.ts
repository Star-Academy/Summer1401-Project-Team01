import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {
    DATASET_GET_ALL_DATASETS,
    DATASET_REMOVE,
    PIPELINE_CREATE,
    PIPELINE_GET_ALL_PIPELINE_NAMES,
    PIPELINE_REMOVE,
} from '../../utilities/urls';
import {snackbarType} from '../../models/snackbar-type.enum';
import {SnackbarService} from '../snackbar.service';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public constructor(private apiService: ApiService, private snackbar: SnackbarService) {}

    public async getAllPipelineNames(): Promise<any> {
        return this.apiService.getRequest({url: `${PIPELINE_GET_ALL_PIPELINE_NAMES}/admin`}).then();
    }

    public async deletePipeline(pipelineName: string): Promise<void> {
        let formData = new FormData();
        formData.append('pipelineName', pipelineName);
        formData.append('username', 'admin');
        await fetch(PIPELINE_REMOVE, {body: formData, method: 'delete'});
        this.snackbar.show('Pipeline deleted', snackbarType.WARNING);
    }

    public async createPipeline(pipelineName: string): Promise<void> {
        let formData = new FormData();
        formData.append('pipelineName', pipelineName);
        formData.append('username', 'admin');
        await fetch(PIPELINE_CREATE, {body: formData, method: 'post'});
        this.snackbar.show('Pipeline created', snackbarType.SUCCESS);
    }
}
