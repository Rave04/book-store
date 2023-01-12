import { Link } from "react-router-dom";
import Nav from "./Nav";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="book-icon.png" alt="logo" />
          <h1>Book Store</h1>
        </div>
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
