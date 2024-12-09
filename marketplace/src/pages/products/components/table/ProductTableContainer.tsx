import ProductTable from './ProductTable';
import Loading from '../../../../components/layout/Loading';
import ErrorMessage from '../../../../components/layout/ErrorMessage';
import useProductsTableStore from '../../hooks/useProductsTableStore';

const ProductTableContainer = () => {
  const { productList, loading, error, deleteProduct, updateProductTitle } =
    useProductsTableStore();

  return (
    <div>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <ProductTable
        products={productList}
        onProductDelete={deleteProduct}
        onSaveProductButtonClick={(title, id) => updateProductTitle(title, id)}
      />
    </div>
  );
};

export default ProductTableContainer;
