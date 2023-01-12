import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BookStoreContext } from "../context/BookStoreContext";
import styles from "./Nav.module.css";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(BookStoreContext);

  const handleLogout = () => {
    logout();
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
