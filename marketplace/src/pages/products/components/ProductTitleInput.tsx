import React, { useCallback } from 'react';

interface ProductTitleInputProps {
  title: string;
  onProductTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTitleInputComponent = ({
  title,
  onProductTitleChange,
}: ProductTitleInputProps) => {
  const memoizedProductTitleChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onProductTitleChange(event);
    },
    [onProductTitleChange]
  );

  return (
    <input
      style={{ width: '100%' }}
      type="text"
      value={title}
      onChange={memoizedProductTitleChangeCallback}
    />
  );
};

const ProductTitleInput = React.memo(ProductTitleInputComponent);

export default ProductTitleInput;
