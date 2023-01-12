import Card from "../../components/UI/Card";
import styles from "./CartItem.module.css";

const CartItem = ({ book, onRemoveFromCart }) => {
  const { image, title, author, price, description } = book;
  return (
    <Card className={styles.cartItem}>
      <div className={styles.itemImageContainer}>
        {image ? <img src={image} /> : <img src="book.png" />}
      </div>
      <div className={styles.itemInfo}>
        <p>{title}</p>
        <p>Autor: {author}</p>
        <p>Cena: {price}zł</p>
        <div>
          <p>{description}</p>
        </div>
      </div>
      <span className={styles.removeBtn} onClick={() => onRemoveFromCart(book)}>
        x
      </span>
    </Card>
  );
};

export default CartItem;
