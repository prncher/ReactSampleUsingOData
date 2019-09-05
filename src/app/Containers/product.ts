import { connect } from 'react-redux';
import { StoreState } from '../../store';

import * as reducer from '../Reducers/Product';
import { ProductsActions, ProductsModel } from '../Components/products';
import { Product } from '../Models/product';
import { Products } from '../Components/products';

function mapDispatchToProps(dispatch: (action: reducer.KnownAction) => void): ProductsActions {
    return {
        getProducts: (data: Product[]) => { dispatch(reducer.getProducts(data)); }
    };
}

function mapStateToProps(state: StoreState): ProductsModel {
    return {
        products: state.products ? state.products.products : [],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
