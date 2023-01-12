import { createContext, useState, useEffect } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const BookStoreContext = createContext({});

const BookStoreProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(
    books.map((book) => ({ ...book }))
  );
  const [category, setCategory] = useState("");

  const changeCategory = (e, mobile, name = "") => {
    if (mobile) {
      setCategory(e.target.value);
    } else {
      name === "Wszystkie" ? setCategory("") : setCategory(name);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filterBooks = () => {
    setFilteredBooks(books.filter((book) => book.category.includes(category)));
  };

  useEffect(() => {
    filterBooks();
  }, [category]);

  const [cart, setCart] = useState([]);

  const categories = [
    "Fantasy",
    "Sci-fi",
    "Horror",
    "Klasyka",
    "Kryminał",
    "Sensacja",
    "Młodzieżowe",
    "Historyczne",
    "Przygodowe",
    "Romans",
    "Biografia",
    "Inne",
  ];

  const width = useWindowWidth();
 
  
  return (
    <BookStoreContext.Provider
      value={{
        books,
        setBooks,
        filteredBooks,
        setFilteredBooks,
        category,
        changeCategory,
        filterBooks,
        categories,
        cart,
        setCart,
        width,
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
};

export { BookStoreContext, BookStoreProvider };
