import React from "react";

function Pagination({ pages, currentPage, nextPage }) {
  const pageLinks = [];

  for (let i = 1; i <= pages + 1; i++) {
    let active = currentPage == i ? "active" : "";
    pageLinks.push(
      <li key={i} onClick={() => nextPage(i)}>
        <a
          href="#"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="flex items-center justify-center my-4">
      <ul className="flex gap-1">{pageLinks}</ul>
    </div>
  );
}

export default Pagination;
