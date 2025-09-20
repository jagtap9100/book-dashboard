import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BookProvider from "./redux/BookProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BookProvider>
      <title>BookStore </title>
      <App />
    </BookProvider>
  </React.StrictMode>
);
