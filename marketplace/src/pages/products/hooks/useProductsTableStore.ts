import { useCallback, useEffect, useReducer, useState } from 'react';
import { ProductService } from '../services/productsService';
import { AxiosError } from 'axios';
import { productReducer, initialProductState } from '../store/product.reducer';
import {
  deleteProductAction,
  setProductListAction,
  updateProductTitleAction,
} from '../store/product.actions';

export const useProductsTableStore = () => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productService = new ProductService();
        const products = await productService.getAllProducts();
        dispatch(setProductListAction(products));
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await new ProductService().deleteProductById(id);
      dispatch(deleteProductAction(id));
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProductTitle = useCallback((productTitle: string, id: number) => {
    dispatch(updateProductTitleAction(id, productTitle));
  }, []);

  return {
    productList: state.productList,
    loading,
    error,
    deleteProduct,
    updateProductTitle,
  };
};
export default useProductsTableStore;