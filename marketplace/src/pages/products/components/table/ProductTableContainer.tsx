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
  } = useProductsTableStore();

  const handleProductAdd = (newProduct: Product) => {
    console.log('New product added:', newProduct);
    addProduct(newProduct);
  };

  return (
    <div>
      <h5>ProductContainer count :{renderCount}</h5>
      <AddProduct onProductAdd={handleProductAdd} />

      <ProductSearch searchQuery={searchQuery} onSearchChange={handleSearch} />
      <ProductSort sortOrder={sortOrder} onSortChange={handleSortChange} />
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <ProductTable
        products={products}
        onProductDelete={memoizedProductDeleteCallback}
        onSaveProductButtonClick={memoizedSaveProductButtonClickCallback}
      />
    </div>
  );
};

export default ProductTableContainer;
