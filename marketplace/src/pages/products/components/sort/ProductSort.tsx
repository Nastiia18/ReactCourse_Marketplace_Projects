import React from 'react';

interface ProductSortProps {
  sortOrder: string;
  onSortChange: (sortOrder: string) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({
  sortOrder,
  onSortChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sort">
      <label htmlFor="sort" className="sort-label">
        Sort by price:{' '}
      </label>
      <select
        id="sort"
        className="sort-select"
        value={sortOrder}
        onChange={handleChange}
      >
        <option value="none">No sorting</option>
        <option value="asc">From smaller to larger</option>
        <option value="desc">From larger to smaller</option>
      </select>
    </div>
  );
};

export default ProductSort;
