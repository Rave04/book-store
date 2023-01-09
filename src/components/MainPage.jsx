import styles from "./MainPage.module.css";
import CategoryList from "../features/category/CategoryList";
import BooksContainer from "../features/book/BooksContainer";

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <BooksContainer />
      <CategoryList />
    </div>
  );
};

export default MainPage;
