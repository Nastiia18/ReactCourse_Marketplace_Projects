import { useState, useEffect, useCallback } from 'react';

import ProductTable from './ProductTable';
import Loading from '../../../../components/layout/Loading';
import ErrorMessage from '../../../../components/layout/ErrorMessage';
import { useRenderCount } from '../../../../hooks/useRenderCount';
import useProductsTableStore from '../../hooks/useProductsTableStore';

const ProductTableContainer = () => {
  const renderCount = useRenderCount();

  const {
    products,
    loading,
    error,
    memoizedProductDeleteCallback,
    memoizedSaveProductButtonClickCallback,
  } = useProductsTableStore();

  return (
    <div>
      <h5>ProductContainer count :{renderCount}</h5>
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
