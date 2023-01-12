import { useContext } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import Button from "../../components/UI/Button";
import styles from "./CategoryItem.module.css";

const CategoryItem = ({ name }) => {
  const { changeCategory } = useContext(BookStoreContext);

  return (
    <Button
      className={styles.categoryItem}
      onClick={() => changeCategory(null, false, name)}
    >
      <p>{name}</p>
    </Button>
  );
};

export default CategoryItem;
