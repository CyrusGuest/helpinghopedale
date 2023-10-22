import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [User, setUser] = useState({});
  const [MobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  let verifiedToken = false;

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        // Verify token validity with Cognito server-side API
        // If token is valid, set the user in state
        // Otherwise, clear the token from local storage
        try {
          const result = await axios.post(
            "https://api.helpinghopedale.org/api/v1/verify_token",
            { token }
          );

          if (result.data.user[0]) {
            toast.success("You've been automatically logged in 🎉🥳", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setUser({
              sub: result.data.user[0].Value,
              account_type: result.data.user[1].Value,
              email_verified: result.data.user[2].Value,
              name: result.data.user[3].Value,
              email: result.data.user[4].Value,
            });

            navigate("/opportunities");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (!verifiedToken) verifyToken();
    verifiedToken = true;
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("authToken");

    // Set the user in state to null
    setUser({});
  };

  return (
    <AppContext.Provider
      value={{
        User,
        setUser,
        MobileNavOpen,
        setMobileNavOpen,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
