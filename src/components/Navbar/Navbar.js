import React, { useState, useContext } from "react";
import { BookContext } from "../../redux/BookProvider";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { setSearchTerm } = useContext(BookContext);
  const [state, setState] = useState({
    searchVal: "",
  });

  const searchHandle = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setState((prev) => ({
        ...prev,
        searchVal: value,
      }));
      setSearchTerm(value);
    }
  };
  return (
    <>
      <nav className="bg-blue-600 shadow-md px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          BookStore
        </Link>
        <Link
          to="/addbooks"
          className="text-white text-[19px] font-bold tracking-wide border border-[2px] font-extralight border-blue-400 rounded-xl p-2"
        >
          Add Books
        </Link>
        <div className="relative w-72">
          <input
            type="text"
            name="search"
            value={state.searchVal}
            onChange={searchHandle}
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
          />

          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
            />
          </svg>
        </div>
      </nav>
    </>
  );
}
