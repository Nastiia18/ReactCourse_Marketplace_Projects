import { memo } from 'react';
import { Product } from '../../services/productsService';
import ProductTableRow from './ProductTableRow';

interface ProductTableProps {
  products: Product[];
  onProductDelete: (id: number) => void;
  onSaveProductButtonClick: (productTitle: string, id: number) => void;
}

const ProductTableComponent = ({
  products,
  onProductDelete,
  onSaveProductButtonClick,
}: ProductTableProps) => {
  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
            <th>Render Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              onProductItemDelete={onProductDelete}
              onSaveProductButtonClick={onSaveProductButtonClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const ProductTable = memo(ProductTableComponent);

export default ProductTable;
