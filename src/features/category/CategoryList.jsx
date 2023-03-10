import { useContext } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import CategoryItem from "./CategoryItem";
import styles from "./CategoryList.module.css";

const CategoryList = () => {
  const { categories, changeCategory, width } = useContext(BookStoreContext);

  return (
    <>
      {width > 1000 ? (
        <div className={styles.categoryList}>
          <h3>Kategorie</h3>
          <CategoryItem name="Wszystkie" />
          {categories.map((category) => (
            <CategoryItem key={category} name={category} />
          ))}
        </div>
      ) : (
        <div className={styles.categoryListMobile}>
          <h3>Kategoria</h3>
          <select onChange={(e) => changeCategory(e, true)}>
            <option value="">Wszystkie</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default CategoryList;
