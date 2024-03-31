import React from "react";

const Pagiantion = ({ totalPage, paginate, onChangePage }) => {
  return (
    <div className="mt-6 flex justify-center">
      <nav>
        <ul className="inline-flex -space-x-px cursor-pointer">
          <li
            onClick={() => {
              if (paginate._page === 1) return;
              onChangePage(paginate._page - 1);
            }}
          >
            <span
              className={`${
                paginate._page === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }  rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
            >
              {"<"}
            </span>
          </li>
          <li>
            <ul className="flex items-center">
              {Array.from({ length: totalPage }).map((_, index) => (
                <li key={index} onClick={() => onChangePage(index + 1)}>
                  <span
                    className={`border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      paginate._page === index + 1
                        ? "font-bold bg-slate-300 hover:bg-slate-300"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li
            onClick={() => {
              if (totalPage === paginate._page) return;
              onChangePage(paginate._page + 1);
            }}
          >
            <span
              className={`${
                totalPage === paginate._page
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
            >
              {">"}
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagiantion;
