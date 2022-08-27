export const BASE_URL = 'https://localhost:7210';

export const UPLOAD_FILE = BASE_URL + '/File/UploadFile'

export const PIPELINE_GET_ALL_PIPELINE_NAMES = BASE_URL + '/Pipeline/GetAllPipelinesNames/';

export const DEFAULT_POST_REQUEST_INIT: RequestInit = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
};
