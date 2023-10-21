import React, { useContext, useState, useEffect } from "react";
import ExploreGraphic from "../images/exploregraphic.jpg";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { Auth } from "aws-amplify";

const ConfirmationComp = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const { User, setUser } = useContext(AppContext);
  let navigate = useNavigate("/opportunities");

  useEffect(() => {
    if (User.email) navigate("/opportunities");
  }, [User.email, navigate]);

  const handleSubmission = async (e) => {
    e.preventDefault();

    console.log(User);

    if (code === "")
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

    const user = {
      username: User.username,
      confirmationCode: code,
    };

    setLoading(true);

    try {
      const result = await axios.post(
        "https://api.platepals.org/api/v1/confirm_user",
        user
      );

      setLoading(false);
      toast.success("Account successfully created 🎉🥳", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setUser(result.data.user);
      Auth.currentSession()
        .then((session) => {
          // Store the session in local storage or session storage
          localStorage.setItem("userSession", JSON.stringify(session));
        })
        .catch((error) => {
          console.error("Error storing user session:", error);
          toast.error("Error storing user session", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      navigate("/opportunities");
    } catch (err) {
      setLoading(false);
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
    }
  };

  return (
    <div className="flex gap-8 mx-auto justify-center mt-20 mb-40 shadow-lg rounded-lg w-fit ">
      <div className="bg-white hidden text-primary rounded-l-lg h-full w-full max-w-lg md:flex justify-center flex-col">
        <h1 className="font-bold text-3xl text-black mt-10 text-center">
          Welcome!
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
        <h1 className="font-bold text-3xl">Create an account</h1>
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
          <form className="flex flex-col max-w-md mt-4 md:mx-auto gap-2 text-x">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="apikey">
                Confirmation code
              </label>
              <input
                className="outline-none btn placeholder-primary border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
                type="text"
                placeholder="123456"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
            </div>

            <button
              className="btn text-primary bg-white mt-60"
              type="button"
              onClick={(e) => handleSubmission(e)}
            >
              Confirm account
            </button>

            <p className="text-sm text-center">Get started today!</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConfirmationComp;
