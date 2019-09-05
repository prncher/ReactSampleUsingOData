import { AxiosResponse } from 'axios';
import { ProductList } from '../Models/productlist';
import { WebserviceClient } from '../Utilities/WebserviceClient';
import { ErrorResponse } from '../Utilities/ErrorResponse';

export class ProductsService {
    getProducts(
        beforeRequest: () => void | null,
        onRequestSuccess: (response: ProductList) => void,
        onRequestFailed: (response: ErrorResponse) => void): void {
        const api: string = 'http://localhost:4000/products';
        WebserviceClient.doRequest(
            'get', api, {}, beforeRequest,
            (response: AxiosResponse) => {
                onRequestSuccess(response.data);
            },
            onRequestFailed
        ).then(r => {
            // tslint:disable-next-line:no-console 
            // console.log(r.data);
            const productList: ProductList = { products: r.data };
            onRequestSuccess(productList);
        });
    }
}

export let ProductsServiceClient = new ProductsService();