import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePage = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPageDisplay = 5;

  let startPage = Math.max(currentPage - Math.floor(maxPageDisplay / 2), 1);
  let endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);

  if (endPage - startPage < maxPageDisplay - 1) {
    startPage = Math.max(endPage - maxPageDisplay + 1, 1);
  }

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {startPage > 1 && <span>...</span>}{' '}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePage(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && <span>...</span>}{' '}

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
