import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UPLOAD_FILE} from '../../utilities/urls';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {SnackbarService} from '../snackbar.service';
import {snackbarType} from '../../models/snackbar-type.enum';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    constructor(public apiService: ApiService, private http: HttpClient, private snackbar: SnackbarService) {}

    public async uploadFile(formData: FormData): Promise<void> {
        await fetch(UPLOAD_FILE, {
            method: 'post',
            body: formData,
        });

        this.snackbar.show('File uploaded successfully', snackbarType.SUCCESS);

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
