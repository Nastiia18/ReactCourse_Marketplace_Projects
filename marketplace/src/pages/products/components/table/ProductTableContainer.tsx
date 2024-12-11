import ProductTable from './ProductTable';
import Loading from '../../../../components/layout/Loading';
import ErrorMessage from '../../../../components/layout/ErrorMessage';
import useProductsTableStore from '../../hooks/useProductsTableStore';
import ProductTableProvider from '../../context/ProductTableProvider';

const ProductTableContainer = () => {
  const { productList, loading, error, deleteProduct, updateProductTitle } =
    useProductsTableStore();

  return (
    <ProductTableProvider>
      <div>
        {loading && <Loading />}
        {error && <ErrorMessage error={error} />}
        <ProductTable
          products={productList}
          onProductDelete={deleteProduct}
          onSaveProductButtonClick={(title, id) =>
            updateProductTitle(title, id)
          }
        />
      </div>
    </ProductTableProvider>
  );
};

export default ProductTableContainer;
