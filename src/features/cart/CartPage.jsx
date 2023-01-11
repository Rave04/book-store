import Card from "../../components/UI/Card";
import CartList from "./CartList";
import styles from "./CartPage.module.css";
import { useContext, useState, useEffect } from "react";
import { BookStoreContext } from "../../context/BookStoreContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartValue, setCartValue] = useState(0);
  const { cart, setCart } = useContext(BookStoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.length) return;
    setCartValue(
      cart.reduce(
        (previousValue, currentBook) =>
          previousValue + Number(currentBook.price),
        0
      )
    );
  }, [cart]);

  const handleCompleteOrder = () => {
    setCart([]);
    navigate("/");
    alert("Zamówienie zostało złożone pomyślnie!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Card className={styles.cartContainer}>
      <h3>Twój koszyk</h3>
      {cart.length > 0 ? (
        <>
          <CartList />
          <p>Pełna wartość koszyka: {cartValue.toFixed(2)}zł</p>
          <button
            onClick={handleCompleteOrder}
            className={styles.completeOrder}
          >
            Zamów
          </button>
        </>
      ) : (
        <p>Koszyk jest pusty!</p>
      )}
    </Card>
  );
};

export default CartPage;
