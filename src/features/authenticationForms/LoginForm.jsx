import { useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePermissions from "../../hooks/usePermissions";
import Card from "../../components/UI/Card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
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
      setUser(user);
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
          <label>Email</label>
          <input ref={emailRef} type="email" />
        </div>
        <div className="formAction">
          <label>Hasło</label>
          <input ref={passwordRef} type="password" />
        </div>
        <button>Zaloguj się</button>
      </form>
    </Card>
  );
};

export default LoginForm;
