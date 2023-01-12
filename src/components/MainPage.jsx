import BooksContainer from "../features/book/BooksContainer";
import CategoryList from "../features/category/CategoryList";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <BooksContainer />
      <CategoryList />
    </div>
  );
};

export default MainPage;
