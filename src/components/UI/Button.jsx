import styles from "./Button.module.css";

const Button = ({ className, children, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
