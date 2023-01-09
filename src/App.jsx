import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { BookStoreProvider } from "./context/BookStoreContext";
import AddBookForm from "./features/book/AddBookForm";
import AddCategoryForm from "./features/category/AddCategoryForm";

const App = () => {
  return (
    <BookStoreProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
        </Route>
      </Routes>
    </BookStoreProvider>
  );
};

export default App;
