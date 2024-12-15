import { useState, useEffect, useCallback } from 'react';
import ProductTable from './ProductTable';
import Loading from '../../../../components/layout/Loading';
import ErrorMessage from '../../../../components/layout/ErrorMessage';
import { useRenderCount } from '../../../../hooks/useRenderCount';
import useProductsTableStore from '../../hooks/useProductsTableStore';
import AddProduct from '../AddProduct/AddProduct';
import { Product } from '../../services/productsService';
import ProductSearch from '../search/ProductSearch';
import ProductSort from '../sort/ProductSort';
import Pagination from '../pagination/Pagination';
import ProductTableProvider from '../../context/ProductTableProvider';

const ProductTableContainer = () => {
  const renderCount = useRenderCount();

  const {
    products,
    loading,
    error,
    addProduct,
    memoizedProductDeleteCallback,
    memoizedSaveProductButtonClickCallback,
    searchQuery,
    handleSearch,
    sortOrder,
    handleSortChange,
    currentPage,
    totalPages,
    handlePageChange,
  } = useProductsTableStore();

  const handleProductAdd = (newProduct: Product) => {
    console.log('New product added:', newProduct);
    addProduct(newProduct);
  };

  return (
    <ProductTableProvider>
      <div>
        <h5>ProductContainer count :{renderCount}</h5>
        <AddProduct onProductAdd={handleProductAdd} />

        <ProductSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />
        <ProductSort sortOrder={sortOrder} onSortChange={handleSortChange} />
        {loading && <Loading />}
        {error && <ErrorMessage error={error} />}
        <ProductTable
          products={products}
          onProductDelete={memoizedProductDeleteCallback}
          onSaveProductButtonClick={memoizedSaveProductButtonClickCallback}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </ProductTableProvider>
  );
};

export default ProductTableContainer;
