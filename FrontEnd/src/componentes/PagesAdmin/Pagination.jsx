import React, { useState } from "react";
import "./Pagination.css"

const Pagination = ({ citasPerPage, totalCitas, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalCitas / citasPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-anterior" onClick={prevPage} disabled={currentPage === 1}> &laquo; Anterior </button></li>

        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => { paginate(number); setCurrentPage(number);}} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}

        <li className="page-item">
          <button className="page-siguiente" onClick={nextPage} disabled={currentPage === pageNumbers.length}> Siguiente &raquo; </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
