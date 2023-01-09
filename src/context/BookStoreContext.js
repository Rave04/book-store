import React, { createContext, useState } from "react";

const BookStoreContext = createContext();

const BookStoreProvider = ({ children }) => {
  const [books, setBooks] = useState([
    { id: 0, title: "Steve Jobs", category: "Biografia" },
    { id: 1, title: "Wiedźmin", category: "Fantasy" },
    { id: 3, title: "Gra o tron", category: "Fantasy" },
    { id: 4, title: "Kubuś Puchatek", category: "Dla dzieci" },
    { id: 5, title: "Metro 2023", category: "Sci Fi" },
  ]);

  const [category, setCategory] = useState(" ");

  const [filteredBooks, setFilteredBooks] = useState(books);

  return (
    <BookStoreProvider
      value={{
        books,
        setBooks,
        category,
        setCategory,
        filteredBooks,
        setFilteredBooks,
      }}
    >
      {children}
    </BookStoreProvider>
  );
};

export { BookStoreContext, BookStoreProvider };
