import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const { total, limit, currentPage, next, prev, hasNext, hasPrev } = pages;
  const totalPage = Math.ceil(total / limit);

  const renderPages = (delta = 2) => {
    const pages = [];
    const pagesWithDot = [];
    const leftCurrentPage = currentPage - delta;
    const rightCurrentPage = currentPage + delta;
    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 ||
        i === currentPage ||
        i === totalPage ||
        (i >= leftCurrentPage && i <= rightCurrentPage)
      ) {
        pages.push(i);
      }
    }

    if (pages.length > 0) {
      for (let j = 0; j < pages.length; j++) {
        pagesWithDot.push(pages[j]);
        if (pages[j + 1] - pages[j] >= delta) {
          pagesWithDot.push("...");
        }
      }
    }

    return pagesWithDot;
  };

  const formatUrl = (page) => {
    return `${location.pathname}?q=${searchParams.get("q")}&page=${page}`;
  };

  return (
    <div id="pagination">
      <ul className="pagination">
        {hasPrev && (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(prev)}>
              Trang trước
            </Link>
          </li>
        )}

        {renderPages().map((page, index) => (
          <li
            className={`page-item ${page === currentPage && "active"}`}
            key={index}
          >
            <Link
              className="page-link"
              to={formatUrl(page)}
              style={page === "..." ? { pointerEvents: "none" } : {}}
            >
              {page}
            </Link>
          </li>
        ))}

        {hasNext && (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(next)}>
              Trang sau
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
