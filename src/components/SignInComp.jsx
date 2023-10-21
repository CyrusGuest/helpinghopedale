import React, { useState, useContext, useEffect } from "react";
import ExploreGraphic from "../images/exploregraphic.jpg";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { User, setUser } = useContext(AppContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (User.email) navigate("/opportunities");
  }, [User.email, navigate]);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (email === "" || password === "")
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

    console.log(emailRegex.test(email));
    console.log(emailRegex.test(password));

    if (!emailRegex.test(email) || !passwordRegex.test(password))
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

    const user = {
      email,
      password,
    };

    setLoading(true);

    try {
      const result = await axios.post(
        "https://api.helpinghopedale.org/api/v1/signin",
        user
      );

      setLoading(false);

      const token = result.data.accessToken;
      localStorage.setItem("authToken", token);

      setUser({
        sub: result.data.user[0].Value,
        account_type: result.data.user[1].Value,
        email_verified: result.data.user[2].Value,
        name: result.data.user[3].Value,
        email: result.data.user[4].Value,
      });

      toast.success("Sign in succesful 🎉🥳", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/opportunities");
    } catch (err) {
      setLoading(false);

      if (err.response) {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
    <div className="flex gap-8 mx-auto justify-center md:mt-20 mb-40 md:mb-72 md:shadow-lg rounded-lg w-fit ">
      <div className="bg-white hidden text-primary rounded-l-lg h-full w-full max-w-lg md:flex justify-center flex-col">
        <h1 className="font-bold text-3xl text-black mt-10 text-center">
          Welcome back!
        </h1>
        <p className="text-center text-gray-500">
          We're glad you decided to keep volunteering.
        </p>
        <img
          src={ExploreGraphic}
          alt=""
          className="object-contain w-2/4 mx-auto mt-10"
        />
      </div>

      <div className="md:mt-4 mx-auto md:mx-0 w-96 bg-white text-primary md:bg-primary md:text-white p-6 rounded-lg md:rounded-r-lg">
        <h1 className="font-bold text-3xl">Sign in</h1>
        <p>
          Don't have an account? Create one{" "}
          <Link to="/getstarted" className="underline font-bold">
            here
          </Link>
          .
        </p>

        {loading ? (
          <div className="ml-32 mt-10">
            <Loading />
          </div>
        ) : (
          <form className="flex flex-col max-w-md mt-4 md:mx-auto gap-2">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="apikey">
                Email
              </label>
              <input
                className="outline-none btn border-none shadow-lg rounded-lg p-2 mt-1 bg-primary text-white placeholder:text-white focus:bg-white focus:text-primary focus:placeholder:text-primary md:bg-white md:text-primary md:placeholder:text-gray-500 md:focus:bg-primary md:focus:text-white md:focus:placeholder:text-white transition-all duration-200"
                type="text"
                placeholder="johndoe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="apikey">
                Password
              </label>
              <input
                className="outline-none btn border-none shadow-lg rounded-lg p-2 mt-1 transition-all duration-200 bg-primary text-white placeholder:text-white focus:bg-white focus:text-primary focus:placeholder:text-primary md:bg-white md:text-primary md:placeholder:text-gray-500 md:focus:bg-primary md:focus:text-white md:focus:placeholder:text-white"
                type="password"
                placeholder="johnlovesdogs123"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button
              className="btn text-white bg-primary md:text-primary md:bg-white mt-4 text-xl md:mt-36"
              type="submit"
              onClick={(e) => handleSubmission(e)}
            >
              Sign in
            </button>

            <Link
              to="/resetpassword"
              className="text-sm text-center md:mb-0 mb-52"
            >
              Forgot your password?
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInComp;
