import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {PIPELINE_GET_ALL_PIPELINE_NAMES} from '../../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public constructor(private apiService: ApiService) {}

    public async getAllPipelineNames(name: string): Promise<any> {
        const response = await fetch(PIPELINE_GET_ALL_PIPELINE_NAMES + name);
        console.log(response);
    }
}
