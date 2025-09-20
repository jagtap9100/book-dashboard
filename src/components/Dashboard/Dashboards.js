import React, { useState, useEffect, useContext } from "react";
import { getBooks, deleteBooks } from "../../api/booksApi";
import Navbar from "../Navbar/Navbar";
import { BookContext } from "../../redux/BookProvider";
import Edit_Modal from "./Edit_Modal";
export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const booksPerPage = 8;
  const { searchTerm } = useContext(BookContext);

  useEffect(() => {
    fetchData();
  }, [books]);
  const fetchData = async () => {
    const data = await getBooks();
    setBooks(data);
  };
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsEditOpen(true);
  };
  const handleDeleteClick = async (book) => {
    let res = await deleteBooks(book.id);
    if (res.status === 201) {
      alert("Book Delete Successfully!");
      fetchData();
    }
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    setSelectedBook(null);
  };
  const handleUpdateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setIsEditOpen(false);
    setSelectedBook(null);
  };
  return (
    <>
      <Navbar />
      <div className="p-6 absolute">
        {/* Use here Grid Layout*/}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {book.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Author:</span> {book.author}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Price:</span> ₹{book.price}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Category:</span> {book.category}
              </p>
              <p
                className={`mb-2 font-medium ${
                  book.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.stock > 0 ? `In Stock: ${book.stock}` : "Out of Stock"}
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => handleEditClick(book)}
                  className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(book)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {isEditOpen && (
        <Edit_Modal
          book={selectedBook}
          onClose={handleCloseModal}
          onUpdate={handleUpdateBook}
        />
      )}
    </>
  );
}
