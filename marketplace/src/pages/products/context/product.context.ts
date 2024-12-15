// product.context.tsx

import { createContext } from 'react';
import { Product } from '../services/productsService'; // підключіть правильний шлях до типу
import { initialProductState, ProductState } from '../store/product.reducer';

// Оновіть тип ProductContext, щоб включити всі необхідні функції
interface ProductContext extends ProductState {
  loading: boolean;
  error: string | null;
  productList: Product[]; // додано productList
}

interface ProductDispatch {
    addProduct: (newProduct: Product) => void;
    memoizedProductDeleteCallback: (id: number) => Promise<void>;
    memoizedSaveProductButtonClickCallback: (productTitle: string, id: number) => void;
    handleSearch: (query: string) => void;
    handleSortChange: (order: string) => void;
    handlePageChange: (page: number) => void;

}

// Оновіть початковий стан
const initialProductContext: ProductContext = {
  ...initialProductState,
  loading: false,
  error: null,
  productList: [], // ініціалізація productList
};

export const ProductContext = createContext<ProductContext>(initialProductContext);
export const ProductDispatchContext = createContext<ProductDispatch | null>(null);
