import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
const Nav = () => {
  return (
    <nav className={styles.navigation}>
      <Link to="/add-book">
        <p>Dodaj książkę</p>
      </Link>
      <Link to="/add-category">
        <p>Dodaj kategorię</p>
      </Link>
    </nav>
  );
};

export default Nav;
