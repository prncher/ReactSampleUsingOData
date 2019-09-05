import { AxiosPromise, default as axios, AxiosRequestConfig, Method } from 'axios';
import { AxiosResponse } from 'axios';

import { ErrorResponse } from './ErrorResponse';

class WebApi {
    doRequest(
        method: Method = 'post',
        api: string,
        // tslint:disable-next-line:no-any
        data: any,
        beforeRequest: () => void,
        onRequestSuccess: (response: AxiosResponse) => void,
        onRequestFailed: (error: ErrorResponse) => void): AxiosPromise {
        const config: AxiosRequestConfig = {
            method: method,
            url: api,
            headers: null,
            data: data,
        };

        if (beforeRequest) {
            beforeRequest();
        }
        return axios(config);
    }
}

export let WebserviceClient = new WebApi();