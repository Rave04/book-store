import { useState, useEffect, useContext } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import useFetch from "../../hooks/useFetch";
import styles from "./BookList.module.css";
import BookItem from "./BookItem";
import { API_URL } from "../../config";

const BookList = () => {
  const { books, setBooks, filteredBooks, setFilteredBooks } =
    useContext(BookStoreContext);
  const [isLoading, fetchError, sendRequest] = useFetch();

  const addBooks = (booksObject) => {
    const loadedBooks = [];

    for (const bookKey in booksObject) {
      loadedBooks.push({
        id: booksObject[bookKey].id,
        title: booksObject[bookKey].title,
        author: booksObject[bookKey].author,
        publishYear: booksObject[bookKey].publishYear,
        price: booksObject[bookKey].price,
        category: booksObject[bookKey].category,
        image: booksObject[bookKey].image,
      });
    }
    setBooks(loadedBooks);
  };

  const fetchBooks = () => {
    sendRequest(
      {
        url: `${API_URL}/books.json`,
      },
      addBooks
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  return (
    <div className={styles.bookList}>
      {!filteredBooks.length && !isLoading && (
        <p>Brak książek dla podanej kategorii</p>
      )}
      {isLoading && <p>Ładowanie</p>}
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
