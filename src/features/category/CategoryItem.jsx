import { useContext, useEffect } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import styles from "./CategoryItem.module.css";

const CategoryItem = ({ name }) => {
  const { changeCategory } = useContext(BookStoreContext);

  return (
    <button
      className={styles.categoryItem}
      onClick={() => changeCategory(null, false, name)}
    >
      <p>{name}</p>
    </button>
  );
};

export default CategoryItem;
