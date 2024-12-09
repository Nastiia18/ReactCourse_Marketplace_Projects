import { Product } from '../services/productsService';

export type ProductActionPayloadTypes = Product[] | Product | number | { id: number; title: string };

export interface ProductAction {
  type: ProductActionTypes;
  payload: ProductActionPayloadTypes;
}

export enum ProductActionTypes {
  SET_PRODUCT_LIST = 'SET_PRODUCT_LIST',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT_TITLE = 'UPDATE_PRODUCT_TITLE',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export const setProductListAction = (products: Product[]): ProductAction => ({
  type: ProductActionTypes.SET_PRODUCT_LIST,
  payload: products,
});

export const addProductAction = (product: Product): ProductAction => ({
  type: ProductActionTypes.ADD_PRODUCT,
  payload: product,
});

export const updateProductTitleAction = (id: number, title: string): ProductAction => ({
  type: ProductActionTypes.UPDATE_PRODUCT_TITLE,
  payload: { id, title },
});

export const deleteProductAction = (id: number): ProductAction => ({
  type: ProductActionTypes.DELETE_PRODUCT,
  payload: id,
});
