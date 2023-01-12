import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";
import usePermissions from "../../hooks/usePermissions";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  usePermissions(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (user) return;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      login(user);
      navigate("/");
      alert("Zalogowano pomyślnie!");
    } catch (error) {
      alert("Logowanie nie powiodło się!");
    }
  };

  return (
    <Card className="cardForm">
      <form onSubmit={handleLogin}>
        <div className="formAction">
          <label htmlFor="loginEmail">Email</label>
          <input ref={emailRef} id="loginEmail" type="email" />
        </div>
        <div className="formAction">
          <label htmlFor="loginPassword">Hasło</label>
          <input ref={passwordRef} id="loginPassword" type="password" />
        </div>
        <Button type="submit">Zaloguj się</Button>
      </form>
    </Card>
  );
};

export default LoginForm;
