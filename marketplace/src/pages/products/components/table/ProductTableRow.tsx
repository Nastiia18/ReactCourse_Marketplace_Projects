import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { useRenderCount } from '../../../../hooks/useRenderCount';
import { Product } from '../../services/productsService';
import ProductTitleInput from '../ProductTitleInput';

interface ProductTableRowProps {
  product: Product;
  onProductItemDelete: (id: number) => void;
  onSaveProductButtonClick: (productTitle: string, id: number) => void;
}

const ProductTableRowComponent = ({
  product,
  onProductItemDelete,
  onSaveProductButtonClick,
}: ProductTableRowProps) => {
  const renderCount = useRenderCount();

  const memoizedProductTitleValue = useMemo(
    () => product.title,
    [product.title]
  );

  const [productTitle, setProductTitle] = useState(memoizedProductTitleValue);
  const [isEditMode, setIsEditMode] = useState(false);

  const memoizedSetProductTitleCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setProductTitle(event.target.value);
    },
    []
  );

  const memoizedSetIsEditModeCallback = useCallback((isEdit: boolean) => {
    setIsEditMode(isEdit);
  }, []);

  const memoizedSaveProductButtonClickCallback = useCallback(() => {
    onSaveProductButtonClick(productTitle, product.id);
    setIsEditMode(false);
  }, [onSaveProductButtonClick, product.id, productTitle]);

  const memoizedProductItemDeleteCallback = useCallback(() => {
    onProductItemDelete(product.id);
  }, [onProductItemDelete, product.id]);

  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>
        {isEditMode ? (
          <ProductTitleInput
            title={productTitle}
            onProductTitleChange={memoizedSetProductTitleCallback}
          />
        ) : (
          product.title
        )}
      </td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '50px', height: 'auto' }}
          />
        ) : (
          'No image available'
        )}
      </td>
      <td>
        <div style={{ display: 'flex', gap: '1em' }}>
          {isEditMode ? (
            <button onClick={memoizedSaveProductButtonClickCallback}>
              Save
            </button>
          ) : (
            <button onClick={() => memoizedSetIsEditModeCallback(true)}>
              Edit
            </button>
          )}
          {isEditMode ? (
            <button onClick={() => memoizedSetIsEditModeCallback(false)}>
              Cancel
            </button>
          ) : (
            <button onClick={memoizedProductItemDeleteCallback}>Delete</button>
          )}
        </div>
      </td>
      <td>{renderCount}</td>
    </tr>
  );
};

const ProductTableRow = memo(ProductTableRowComponent);

export default ProductTableRow;
