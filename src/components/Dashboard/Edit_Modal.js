import React, { useState, useEffect } from "react";
import { editBooks } from "../../api/booksApi";
export default function Edit_Modal({ book, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    // id: "",
    title: "",
    author: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedBook = await editBooks(formData.id, formData);
      console.log("Updated Book:", updatedBook);

      if (updatedBook) {
        onUpdate(updatedBook);

        onClose();
      }
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Edit Book</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
