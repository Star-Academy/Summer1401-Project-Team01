import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {UPLOAD_FILE} from "../../utilities/urls";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public apiService:ApiService) { }

  public async uploadFile(formData: FormData): Promise<void> {
    await this.apiService.postRequest({url: UPLOAD_FILE, body: formData});
  }
}
