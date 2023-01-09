import Card from "../../components/UI/Card";
import styles from "./BookItem.module.css";

const BookItem = ({ title }) => {
  return (
    <Card className={styles.bookItem}>
      <p>{title}</p>
    </Card>
  );
};

export default BookItem;
