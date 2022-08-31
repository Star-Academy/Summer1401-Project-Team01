export const BASE_URL = 'https://localhost:7210';

export const UPLOAD_FILE = BASE_URL + '/Dataset/AddDataset';
export const DOWNLOAD_FILE = BASE_URL + '/File/DownloadFile';

export const DATASET_GET_ALL_DATASETS = BASE_URL + '/Dataset/GetAllDatasets';
export const DATASET_REMOVE = BASE_URL + '/Dataset/RemoveDataset';
export const DATASET_SAMPLE = BASE_URL + '/Dataset/GetDatasetSample';
export const DATASET_GET_ALL_COLUMNS = BASE_URL + '/Dataset/GetDatasetColumns';

export const PIPELINE_GET_ALL_PIPELINE_NAMES = BASE_URL + '/Pipeline/GetAllPipelinesNames';
export const PIPELINE_UPDATE_PROCESSES = BASE_URL + '/Pipeline/UpdateProcesses';
export const PIPELINE_RUNPIPELINE = BASE_URL + '/Pipeline/RunPipeline';
export const PIPELINE_ADD_SOURCE = BASE_URL + '/Pipeline/AddSource';
export const PIPELINE_ADD_DESTINATION = BASE_URL + '/Pipeline/AddDestination';
export const PIPELINE_REMOVE_SOURCE = BASE_URL + '/Pipeline/RemoveSource';
export const PIPELINE_REMOVE_DESTINATION = BASE_URL + '/Pipeline/RemoveDestination';
export const PIPELINE_GET_PIPELINE = BASE_URL + '/Pipeline/GetPipeLine';
export const PIPELINE_REMOVE = BASE_URL + '/Pipeline/RemovePipeline';
export const PIPELINE_CREATE = BASE_URL + '/Pipeline/AddPipeline'

export const DEFAULT_POST_REQUEST_INIT: RequestInit = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
};
