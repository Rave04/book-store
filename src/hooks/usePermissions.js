import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
