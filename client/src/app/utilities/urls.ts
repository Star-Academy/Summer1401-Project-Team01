export const BASE_URL = 'https://localhost:7210';

export const PIPLINE_GETALLPIPELINENAMES = BASE_URL + '/Pipeline/GetAllPipelinesNames/';

export const DEFAULT_POST_REQUEST_INIT: RequestInit = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
};
