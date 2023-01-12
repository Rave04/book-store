import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePermissions from "../../hooks/usePermissions";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  usePermissions(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email.trim() === "" || password.trim() === "" || password.length < 6) {
      alert(
        "Email i hasło nie mogą być puste, hasło musi mieć conajmniej 6 znaków!"
      );
      return;
    }
    register(email, password);
    navigate("/");
    alert("Zarejestrowano pomyślnie!");
  };
  return (
    <Card className="cardForm">
      <form onSubmit={handleRegister}>
        <div className="formAction">
          <label htmlFor="username">Nazwa użytkownika</label>
          <input ref={usernameRef} id="username" type="text" />
        </div>
        <div className="formAction">
          <label htmlFor="registerEmail">Email</label>
          <input ref={emailRef} id="registerEmail" type="email" />
        </div>
        <div className="formAction">
          <label htmlFor="registerPassword">Hasło</label>
          <input ref={passwordRef} id="registerPassword" type="password" />
        </div>
        <Button type="submit">Zarejestruj się</Button>
      </form>
    </Card>
  );
};

export default RegisterForm;
