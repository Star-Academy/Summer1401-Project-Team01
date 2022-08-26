export interface RequestOptions {
    url: string;
    init?: RequestInit;
    showError?: boolean;
}

export interface GetRequestOptions extends RequestOptions {}

export interface PostRequestOptions extends RequestOptions {
    body: any;
}
