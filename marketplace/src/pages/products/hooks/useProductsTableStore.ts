import { useCallback, useEffect, useReducer, useState } from "react";
import { Product, ProductService } from "../services/productsService";
import { AxiosError } from "axios";
import { productReducer, initialProductState } from "../store/product.reducer";
import {
  setProductListAction,
  deleteProductAction,
  updateProductTitleAction,
  addProductAction,
} from "../store/product.actions";

export const useProductsTableStore = () => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;

    const productService = new ProductService(signal);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProducts = await productService.getAllProducts();

        if (isMounted) {
          dispatch(setProductListAction(fetchedProducts));
        }
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const addProduct = useCallback((newProduct: Product) => {
    const newId = state.productList.length > 0
      ? Math.max(...state.productList.map((product) => product.id)) + 1
      : 1;
    dispatch(addProductAction({ ...newProduct, id: newId }));
  }, [state.productList]);


  const memoizedProductDeleteCallback = useCallback(async (id: number) => {
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

  const memoizedSaveProductButtonClickCallback = useCallback(
    (productTitle: string, id: number) => {
      if (!productTitle) return;

      dispatch(updateProductTitleAction(id, productTitle));
    },
    []
  );

  return {
    products: state.productList,
    loading,
    error,
    addProduct,
    memoizedProductDeleteCallback,
    memoizedSaveProductButtonClickCallback,
  };
};

export default useProductsTableStore;
