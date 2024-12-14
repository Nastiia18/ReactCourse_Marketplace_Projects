import React, { useState } from 'react';

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for products..."
      />
    </div>
  );
};

export default ProductSearch;
