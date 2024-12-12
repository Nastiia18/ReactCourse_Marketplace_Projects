import { createContext } from 'react';
import { Product } from "../services/productsService";

export interface ProductContextProps {
  productList: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductDispatchContextProps {
  deleteProduct: (id: number) => void;
  updateProductTitle: (title: string, id: number) => void;
}

const initialProductContext: ProductContextProps = {
  productList: [],
  loading: false,
  error: null,
};

export const ProductContext = createContext<ProductContextProps | undefined>(initialProductContext);
export const ProductDispatchContext = createContext<ProductDispatchContextProps | undefined>(undefined);