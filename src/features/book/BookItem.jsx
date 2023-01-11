import { useContext, useEffect } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import Card from "../../components/UI/Card";
import styles from "./BookItem.module.css";
import uuidv4 from "uuidv4";

const BookItem = ({ book }) => {
  const { image, title, publishYear, price } = book;
  const { cart, setCart } = useContext(BookStoreContext);

  const handleAddItemToCart = () => {
    setCart((prevCart) => [...prevCart, { cartItemId: uuidv4(), ...book }]);
  };

  return (
    <Card className={styles.bookItem}>
      <div className={styles.bookImageContainer}>
        <span onClick={handleAddItemToCart}>+</span>
        {image ? <img src={image} /> : <img src="book.png" />}
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
