import { useContext } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import styles from "./BooksContainer.module.css";
import BookList from "./BookList";

const BooksContainer = () => {
  const { category } = useContext(BookStoreContext);
  return (
    <div className={styles.booksContainer}>
      <h3 className={styles.selectedCategory}>
        Wybrano kategorię:{" "}
        <span>{category.length > 0 ? category : "Wszystkie"}</span>
      </h3>
      <BookList />
    </div>
  );
};

export default BooksContainer;
