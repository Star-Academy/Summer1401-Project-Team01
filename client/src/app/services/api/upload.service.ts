import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UPLOAD_FILE} from '../../utilities/urls';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    constructor(public apiService: ApiService, private http: HttpClient) {}

    public async uploadFile(formData: FormData): Promise<void> {
        //await this.apiService.postRequest({url: UPLOAD_FILE, body: formData});

        await fetch(UPLOAD_FILE, {
            method: 'post',
            body: formData,
        });

        // this.http.post(UPLOAD_FILE, formData, {reportProgress: true, observe: 'events'}).subscribe(
        //     (event) => {
        //         if (event.type === HttpEventType.Response) {
        //             console.log(event);
        //         }
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );

        //     .subscribe({
        //     next: (response) => console.log(response),
        //     error: (error) => console.log(error),
        // });

        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', UPLOAD_FILE, true);
        // xhr.onload = function () {
        //     // do something to response
        //     console.log(this.responseText);
        // };
        // xhr.send(formData);
    }
}
