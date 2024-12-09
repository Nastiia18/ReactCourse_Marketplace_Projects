import { Product } from '../services/productsService';
import { ProductAction, ProductActionTypes } from './product.actions';

export interface ProductState {
  productList: Product[];
}

export const initialProductState: ProductState = {
  productList: [],
};

export const productReducer = (
  state = initialProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCT_LIST:
      return { ...state, productList: action.payload as Product[] };

    case ProductActionTypes.ADD_PRODUCT:
      return { ...state, productList: [...state.productList, action.payload as Product] };

    case ProductActionTypes.UPDATE_PRODUCT_TITLE:
      const { id, title } = action.payload as { id: number; title: string };
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.id === id ? { ...product, title } : product
        ),
      };

    case ProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter((product) => product.id !== action.payload),
      };

    default:
      return state;
  }
};
