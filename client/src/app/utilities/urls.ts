export const BASE_URL = 'https://localhost:7210';

export const UPLOAD_FILE = BASE_URL + '/Dataset/AddDataset';
export const DOWNLOAD_FILE = BASE_URL + '/File/DownloadFile/download';

export const DATASET_GET_ALL_DATASETS = BASE_URL + '/Dataset/GetAllDatasets';
export const DATASET_REMOVE = BASE_URL + '/Dataset/RemoveDataset';

export const PIPELINE_GET_ALL_PIPELINE_NAMES = BASE_URL + '/Pipeline/GetAllPipelinesNames';
export const PIPELINE_UPDATE_PROCESSES = BASE_URL + '/Pipeline/UpdateProcesses/';
export const PIPELINE_RUNPIPELINE = BASE_URL + '/Pipeline/RunPipeline/';
export const PIPELINE_ADD_SOURCE = BASE_URL + '/Pipeline/AddSource/';
export const PIPELINE_ADD_DESTINATION = BASE_URL + '/Pipeline/AddDestination/';

export const DEFAULT_POST_REQUEST_INIT: RequestInit = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
};
