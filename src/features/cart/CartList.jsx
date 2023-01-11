import { useContext } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

const CartList = () => {
  const { cart, setCart, width } = useContext(BookStoreContext);

  const handleRemoveFromCart = (item) => {
    console.log(cart);
    setCart((prevCart) =>
      prevCart.filter((book) => book.cartItemId !== item.cartItemId)
    );
  };

  return (
    <>
      <ul className={styles.cartList}>
        {cart.map((book) => (
          <CartItem
            key={book.cartItemId}
            book={book}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </ul>
    </>
  );
};

export default CartList;
