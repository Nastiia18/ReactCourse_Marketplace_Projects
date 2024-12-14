import { Product } from "../services/productsService";

// Типи даних, які можуть передаватися у payload
export type ProductActionPayloadTypes =
  | Product[]
  | Product
  | number
  | { id: number; title: string };

// Інтерфейс для екшенів
export interface ProductAction {
  type: ProductActionTypes;
  payload: ProductActionPayloadTypes;
}

// Перелічення всіх можливих типів екшенів
export enum ProductActionTypes {
  SET_PRODUCT_LIST = "SET_PRODUCT_LIST",
  ADD_PRODUCT = "ADD_PRODUCT",
  UPDATE_PRODUCT_TITLE = "UPDATE_PRODUCT_TITLE",
  DELETE_PRODUCT = "DELETE_PRODUCT",
}

// Екшен для встановлення списку продуктів
export const setProductListAction = (products: Product[]): ProductAction => {
  return {
    type: ProductActionTypes.SET_PRODUCT_LIST,
    payload: products,
  };
};

// Екшен для додавання нового продукту
export const addProductAction = (product: Product): ProductAction => {
  return {
    type: ProductActionTypes.ADD_PRODUCT,
    payload: product,
  };
};

// Екшен для оновлення назви продукту
export const updateProductTitleAction = (id: number, title: string): ProductAction => {
  return {
    type: ProductActionTypes.UPDATE_PRODUCT_TITLE,
    payload: { id, title },
  };
};

// Екшен для видалення продукту
export const deleteProductAction = (id: number): ProductAction => {
  return {
    type: ProductActionTypes.DELETE_PRODUCT,
    payload: id,
  };
};
