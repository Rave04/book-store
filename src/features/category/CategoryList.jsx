import styles from "./CategoryList.module.css";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  return (
    <div className={styles.categoryList}>
      <h3>Kategorie</h3>
      <CategoryItem name="Wszystkie" />
      <CategoryItem name="Fantasy" />
      <CategoryItem name="Sci-fi" />
      <CategoryItem name="Dokumentalne" />
    </div>
  );
};

export default CategoryList;
