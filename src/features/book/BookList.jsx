import { useContext } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import styles from "./BookList.module.css";
import BookItem from "./BookItem";

const BookList = () => {
  const { filteredBooks } = useContext(BookStoreContext);
  return (
    <div className={styles.bookList}>
      {filteredBooks.map((book) => (
        <BookItem title={book.title} />
      ))}
    </div>
  );
};

export default BookList;
