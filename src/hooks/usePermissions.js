import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const usePermissions = (auth = false) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      if (user) navigate("/");
    } else {
      if (!user) navigate("/");
    }
    console.log(user);
  }, []);
};

export default usePermissions;
