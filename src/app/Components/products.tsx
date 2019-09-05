import * as React from 'react';
import { Product } from '../Models/product';
import * as service from '../Services/ProductsService';
import { ErrorResponse } from '../Utilities/ErrorResponse';
import { ProductsList } from './productsList';

export interface ProductsModel {
    products: Product[];
}

export interface ProductsActions {
    getProducts: (data: Product[]) => void;
}

type ProductsProps = ProductsModel & ProductsActions;

export class Products extends React.Component<ProductsProps> {
    componentDidMount() {
        service.ProductsServiceClient.getProducts(
            () => null,
            (response: ProductsModel) => this.props.getProducts(response.products),
            (response: ErrorResponse) => null
        );
    }

    public render() {
        const { products } = this.props;
        return <ProductsList products={products} />;
    }
}
