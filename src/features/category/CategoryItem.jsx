import styles from "./CategoryItem.module.css";

const CategoryItem = ({ name }) => {
  return (
    <button className={styles.categoryItem}>
      <p>{name}</p>
    </button>
  );
};

export default CategoryItem;
