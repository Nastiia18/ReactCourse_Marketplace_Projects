import ProductTableContainer from './components/table/ProductTableContainer';
import PageTitle from '../../components/layout/PageTitle';
const ProductsPage = () => {
  return (
    <div>
      <PageTitle title="Products" />
      <ProductTableContainer />
    </div>
  );
};

export default ProductsPage;
