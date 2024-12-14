import React, { useState } from 'react';

interface ProductSearchProps {
  searchQuery: string; // Додаємо пропс для значення пошукового запиту
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
        onChange={(e) => onSearchChange(e.target.value)} // Викликаємо функцію для обробки зміни значення
        placeholder="Search for products..."
      />
    </div>
  );
};

export default ProductSearch;
