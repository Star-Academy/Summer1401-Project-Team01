import {Injectable} from '@angular/core';
import {SnackbarService} from '../snackbar.service';
import {snackbarType} from '../../models/snackbar-type.enum';
import {GetRequestOptions, PostRequestOptions, RequestOptions} from 'src/app/models/request-options.model';
import {DEFAULT_POST_REQUEST_INIT} from '../../utilities/urls';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public constructor(private snackbarService: SnackbarService) {}
    private static generatePostRequestInit(options: PostRequestOptions): RequestInit {
        return {
            ...DEFAULT_POST_REQUEST_INIT,
            body: JSON.stringify(options.body),
            ...(options.init || {}),
        };
    }

    public async getRequest<T>(options: GetRequestOptions): Promise<T | null> {
        return await this.fetchRequest<T>(options, options.init);
    }

    public async postRequest<T>(options: PostRequestOptions): Promise<T | null> {
        const init = ApiService.generatePostRequestInit(options);
        return await this.fetchRequest<T>(options, init);
    }

    private async fetchRequest<T>(options: RequestOptions, init?: RequestInit): Promise<T | null> {
        const {url, showError = true} = options;

        const response = await fetch(url, init);
        const data = await response.json();

        if (response.ok) return data as T;

        if (showError) this.snackbarService.show('error', snackbarType.WARNING);

        return null;
    }
}
