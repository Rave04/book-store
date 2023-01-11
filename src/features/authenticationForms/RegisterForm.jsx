import { useRef, useContext } from "react";
import usePermissions from "../../hooks/usePermissions";
import Card from "../../components/UI/Card";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  usePermissions(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      alert("Rejestracja nie powiodła się!");
      return;
    }
    navigate("/");
    alert("Zarejestrowano pomyślnie!");
  };
  return (
    <Card className="cardForm">
      <form onSubmit={handleRegister}>
        <div className="formAction">
          <label>Nazwa użytkownika</label>
          <input ref={usernameRef} type="text" />
        </div>
        <div className="formAction">
          <label>Email</label>
          <input ref={emailRef} type="email" />
        </div>
        <div className="formAction">
          <label>Hasło</label>
          <input ref={passwordRef} type="password" />
        </div>
        <button type="submit">Zarejestruj się</button>
      </form>
    </Card>
  );
};

export default RegisterForm;
