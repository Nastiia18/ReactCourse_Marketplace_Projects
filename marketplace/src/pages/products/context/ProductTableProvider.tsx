import React, { useState, useEffect } from 'react';
import { ProductContext, ProductDispatchContext } from './product.context';
import { useProductsTableStore } from '../hooks/useProductsTableStore';

interface ProductTableProviderProps {
  children: React.ReactNode;
}

const ProductTableProvider = ({ children }: ProductTableProviderProps) => {
  const { productList, loading, error, deleteProduct, updateProductTitle } =
    useProductsTableStore();

  const [productContextValue, setProductContextValue] = useState({
    productList,
    loading,
    error,
  });

  const [dispatchContextValue, setDispatchContextValue] = useState({
    deleteProduct,
    updateProductTitle,
  });

  useEffect(() => {
    setProductContextValue({ productList, loading, error });
    setDispatchContextValue({ deleteProduct, updateProductTitle });
  }, [productList, loading, error, deleteProduct, updateProductTitle]);

  return (
    <ProductContext.Provider value={productContextValue}>
      <ProductDispatchContext.Provider value={dispatchContextValue}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};

export default ProductTableProvider;
