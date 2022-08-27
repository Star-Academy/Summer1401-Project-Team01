import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {PIPLINE_GETALLPIPELINENAMES} from '../../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public constructor(private apiService: ApiService) {}

    public async getAllPipelineNames(name: string): Promise<any> {
        const response = await fetch(PIPLINE_GETALLPIPELINENAMES + name);
        console.log(response);
    }
}
