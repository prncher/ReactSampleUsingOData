import { combineReducers, createStore } from 'redux';
import { ProductsState, reducer as productsReducer } from './app/Reducers/Product';

export interface StoreState {
    products: ProductsState;
}

const combinedReducers = combineReducers<StoreState>({
    products: productsReducer
});

export const store = createStore<StoreState>(combinedReducers);