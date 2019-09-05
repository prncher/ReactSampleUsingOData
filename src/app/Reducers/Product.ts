import { Reducer } from 'redux';
import { Product } from '../Models/product';

export const GET_PRODUCTS = 'GET_PRODUCTS';

export interface ProductsState {
    products: Product[];
}

const unloadedState: ProductsState = {
    products: []
};

export interface GetProducts {
    type: typeof GET_PRODUCTS;
    productsData: Product[];
}

export type KnownAction = GetProducts;

export function getProducts(data: Product[]): GetProducts {
    return {
        type: GET_PRODUCTS,
        productsData: data,
    };
}

export const reducer: Reducer<ProductsState> = (state: ProductsState, action: KnownAction): ProductsState => {
    // tslint:disable-next-line:switch-default
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                products: action.productsData,
            };
    }

    return state || unloadedState;
};