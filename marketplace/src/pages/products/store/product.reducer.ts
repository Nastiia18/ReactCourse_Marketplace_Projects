import { Product } from "../services/productsService";
import { ProductAction, ProductActionTypes } from "./product.actions";

// Стан для продуктів
export interface ProductState {
  productList: Product[];
}

// Початковий стан
export const initialProductState: ProductState = {
  productList: [],
};

// Редюсер для обробки екшенів
export const productReducer = (
  state: ProductState = initialProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCT_LIST: {
      return {
        ...state,
        productList: action.payload as Product[],
      };
    }
    case ProductActionTypes.ADD_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.payload as Product],
      };
    case ProductActionTypes.UPDATE_PRODUCT_TITLE: {
      const payload = action.payload as { id: number; title: string };

      return {
        ...state,
        productList: state.productList.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              title: payload.title,
            };
          }

          return product;
        }),
      };
    }
    case ProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};
