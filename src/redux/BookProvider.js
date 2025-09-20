import React, { createContext, useState } from "react";

export const BookContext = createContext();

export default function BookProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BookContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </BookContext.Provider>
  );
}
