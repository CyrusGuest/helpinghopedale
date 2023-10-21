import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  let navigate = useNavigate();
  let { User } = useContext(AppContext);

  useEffect(() => {
    if (!User.email) {
      return navigate("/");
    }
  }, [User]);

  return children;
};

export default ProtectedRoute;
