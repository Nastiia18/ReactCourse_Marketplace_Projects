// ProductTableProvider.tsx
/*import React, { useMemo } from "react";

/*import { ProductContext, ProductDispatchContext } from '../context/product.context';*/
/*
import { useProductsTableStore } from "../hooks/useProductsTableStore";

interface ProductContextDispatchProviderProps {
  children: React.ReactNode;
}

const ProductTableProvider = ({ children }: ProductContextDispatchProviderProps) => {
  const {
    productList,
    loading,
    error,
    memoizedSaveProductButtonClickCallback,
    memoizedProductItemDeleteButtonClickCallback,
  } = useProductsTableStore();

  const memoizedValue = useMemo(() => {
    return {
      productList,
      loading,
      error,
    };
  }, [productList, loading, error]);

  const memoizedDispatch = useMemo(() => {
    return {
      memoizedSaveProductButtonClickCallback,
      memoizedProductItemDeleteButtonClickCallback,
    };
  }, [
    memoizedSaveProductButtonClickCallback,
    memoizedProductItemDeleteButtonClickCallback,
  ]);

  return (
    
    <ProductContext.Provider value={memoizedValue}>
      <ProductDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  
  );
};

export default ProductTableProvider;*/
