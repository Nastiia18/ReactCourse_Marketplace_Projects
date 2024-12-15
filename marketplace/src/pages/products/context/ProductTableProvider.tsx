import React, { useMemo } from 'react';
import { ProductContext, ProductDispatchContext } from './product.context';
import { useProductsTableStore } from '../hooks/useProductsTableStore';

interface ProductProviderProps {
  children: React.ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const {
    products,
    loading,
    error,
    addProduct,
    memoizedProductDeleteCallback,
    memoizedSaveProductButtonClickCallback,
    searchQuery,
    sortOrder,
    currentPage,
    totalPages,
    handleSearch,
    handleSortChange,
    handlePageChange,
  } = useProductsTableStore();

  const productContextValue = useMemo(
    () => ({
      productList: products,
      loading,
      error,
      searchQuery,
      sortOrder,
      currentPage,
      totalPages,
    }),
    [products, loading, error, searchQuery, sortOrder, currentPage, totalPages]
  );

  const dispatchContextValue = useMemo(
    () => ({
      addProduct,
      memoizedProductDeleteCallback,
      memoizedSaveProductButtonClickCallback,
      handleSearch,
      handleSortChange,
      handlePageChange,
    }),
    [
      addProduct,
      memoizedProductDeleteCallback,
      memoizedSaveProductButtonClickCallback,
      handleSearch,
      handleSortChange,
      handlePageChange,
    ]
  );

  return (
    <ProductContext.Provider value={productContextValue}>
      <ProductDispatchContext.Provider value={dispatchContextValue}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;
