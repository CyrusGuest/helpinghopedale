import React, { useContext, useState, useEffect } from "react";
import ExploreGraphic from "../images/exploregraphic.jpg";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ConfirmationComp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { User, setUser } = useContext(AppContext);
  let navigate = useNavigate("/opportunities");

  useEffect(() => {
    if (User.email) navigate("/opportunities");
  }, [User.email, navigate]);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (email === "")
      return toast.error("Please fill out all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    if (!emailRegex.test(email))
      return toast.error("Please enter a valid email/password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    setLoading(true);

    if (!confirmation) {
      try {
        const response = await axios.post(
          "https://api.helpinghopedale.org/api/v1/reset_password",
          { email } // Note: Make sure the email is sent as an object
        );

        setLoading(false);

        if (response.data.error) throw new Error(response.data.error);

        setConfirmation(true);

        toast.success("Verification code sent!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        setLoading(false);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      try {
        const response = await axios.post(
          "https://api.helpinghopedale.org/api/v1/confirm_reset_password",
          { email, confirmationCode, newPassword } // Note: Send necessary data as an object
        );

        setLoading(false);

        console.log(response);

        if (response.data.error) throw new Error(response.data.error);
        toast.success("Password successfully reset!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/signin");
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="flex gap-8 mx-auto justify-center mt-20 mb-40 shadow-lg rounded-lg w-fit ">
      <div className="bg-white hidden text-primary rounded-l-lg h-full w-full max-w-lg md:flex justify-center flex-col">
        <h1 className="font-bold text-3xl text-black mt-10 text-center">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500">
          We're glad you decided to start volunteering.
        </p>
        <img
          src={ExploreGraphic}
          alt=""
          className="object-contain w-2/4 mx-auto mt-12"
        />
      </div>

      <div className="md:mt-4 mx-auto md:mx-0 w-96 bg-primary text-white p-6 rounded-lg md:rounded-r-lg">
        <h1 className="font-bold text-3xl">Reset Password</h1>
        <p>
          Already have an account? Sign in{" "}
          <Link to="/signin" className="underline font-bold">
            here
          </Link>
          .
        </p>

        {loading ? (
          <div className="ml-32 mt-10">
            <Loading />
          </div>
        ) : (
          <form
            className="flex flex-col max-w-md mt-4 md:mx-auto gap-2 text-x"
            onSubmit={handleSubmission}
          >
            {confirmation ? (
              <>
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="confirmationCode">
                    Confirmation Code
                  </label>
                  <input
                    className="outline-none btn placeholder-primary border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
                    type="text"
                    placeholder="Confirmation Code"
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    value={confirmationCode}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="outline-none btn placeholder-primary border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="apikey">
                    Email
                  </label>
                  <input
                    className="outline-none btn placeholder-primary border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
            )}

            <button
              className={`btn text-primary bg-white ${
                confirmation ? "mt-40" : "mt-60"
              }`}
              type="submit" // Note: Changed to type="submit"
            >
              {confirmation ? "Confirm Reset Password" : "Reset Password"}
            </button>

            <p className="text-sm text-center">
              If we find an account associated with this email, we'll send
              instructions to reset your password.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConfirmationComp;
