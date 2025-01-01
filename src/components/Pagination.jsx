import React from 'react';

export const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}) => (
  <div className="pagination">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className="pagination-button"
    >
      Sebelumnya
    </button>
    <span className="pagination-info">
      Halaman {currentPage} dari {totalPages}
    </span>
    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className="pagination-button"
    >
      Selanjutnya
    </button>
  </div>
);

