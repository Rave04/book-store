import styles from "./BooksContainer.module.css";
import BookList from "./BookList";

const BooksContainer = () => {
  return (
    <div className={styles.booksContainer}>
      <h3 className={styles.selectedCategory}>
        Wybrano kategorię: <span>Wszystkie</span>
      </h3>
      <BookList />
    </div>
  );
};

export default BooksContainer;
