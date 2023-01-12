import { useContext } from "react";
import uuidv4 from "uuidv4";
import { BookStoreContext } from "../../context/BookStoreContext";
import Card from "../../components/UI/Card";
import styles from "./BookItem.module.css";

const BookItem = ({ book }) => {
  const { image, title, publishYear, price } = book;
  const { setCart } = useContext(BookStoreContext);

  const handleAddItemToCart = () => {
    setCart((prevCart) => [...prevCart, { cartItemId: uuidv4(), ...book }]);
  };

  return (
    <Card className={styles.bookItem}>
      <div className={styles.bookImageContainer}>
        <span onClick={handleAddItemToCart}>+</span>
        {image ? (
          <img src={image} />
        ) : (
          <img src="book-store/default-cover.png" />
        )}
      </div>
      <div className={styles.bookInfo}>
        <p className={styles.bookTitle}>{title}</p>
        <p>Rok wydania: {publishYear}</p>
        <p>Cena: {price}zł</p>
      </div>
    </Card>
  );
};

export default BookItem;
