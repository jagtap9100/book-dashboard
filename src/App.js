import { getBooks } from "./api/booksApi";
import Dashboards from "./components/Dashboard/Dashboards.js";
import AddBooks from "./components/AddEditBook/AddBooks.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  getBooks();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboards />}></Route>
        <Route path="/addbooks" element={<AddBooks />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
