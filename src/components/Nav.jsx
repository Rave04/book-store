import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Nav.module.css";
import { BookStoreContext } from "../context/BookStoreContext";
const Nav = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(BookStoreContext);
  const handleLogout = () => {
    setUser(null);
    alert("Wylogowano pomyślnie");
  };
  return (
    <nav className={styles.navigation}>
      <Link to="/cart">
        <p>Twój koszyk ({cart.length})</p>
      </Link>
      {user && (
        <>
          <Link to="/add-book">
            <p>Dodaj książkę</p>
          </Link>
          <Link to="/" onClick={handleLogout}>
            <p>Wyloguj się</p>
          </Link>
        </>
      )}

      {!user && (
        <>
          <Link to="/register">
            <p>Zarejestruj się</p>
          </Link>
          <Link to="/login">
            <p>Zaloguj się</p>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
