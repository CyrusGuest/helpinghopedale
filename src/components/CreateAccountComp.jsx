import React, { useContext, useState, useEffect } from "react";
import ExploreGraphic from "../images/exploregraphic.jpg";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const CreateAccountComp = () => {
  const [individual, setIndividual] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
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

    if (email === "" || password === "" || name === "")
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
      account_type: `${individual ? "Individual" : "Organization"}`,
      name,
      email,
      password,
    };

    setLoading(true);

    try {
      const result = await axios.post(
        "https://api.platepals.org/api/v1/create_user",
        user
      );

      setLoading(false);
      toast.warning("Please confirm your account", {
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
      navigate("/confirmation");
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
    <div className="flex gap-8 mx-auto justify-center md:mt-20 mb-40 md:shadow-lg rounded-lg w-fit ">
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
          className="object-contain w-2/4 mx-auto mt-20"
        />
      </div>

      <div className="md:mt-4 mx-auto md:mx-0 w-96 bg-white text-primary md:bg-primary md:text-white p-6 rounded-lg md:rounded-r-lg">
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
                User type
              </label>

              <div className="flex gap-2">
                <button
                  className={`btn w-full mt-1 ${
                    individual
                      ? " md:text-primary md:bg-white text-white bg-primary"
                      : " md:text-white md:bg-primary text-primary bg-white"
                  }`}
                  type="button"
                  onClick={() => setIndividual(true)}
                >
                  Volunteer
                </button>
                <button
                  className={`btn w-full mt-1 ${
                    !individual
                      ? " md:text-primary md:bg-white text-white bg-primary"
                      : " md:text-white md:bg-primary text-primary bg-white"
                  }`}
                  type="button"
                  onClick={() => setIndividual(false)}
                >
                  Organizer
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="apikey">
                Full name
              </label>
              <input
                className="outline-none btn placeholder:text-white md:placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-white bg-primary focus:text-primary focus:bg-white focus:placeholder:text-primary md:text-primary md:bg-white md:focus:bg-primary md:focus:text-white md:focus:placeholder-white transition-all duration-200"
                type="text"
                placeholder="Johnathon Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="apikey">
                Email
              </label>
              <input
                className="outline-none btn placeholder:text-white md:placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-white bg-primary  focus:text-primary focus:bg-white focus:placeholder:text-primary md:text-primary md:bg-white md:focus:bg-primary md:focus:text-white md:focus:placeholder-white transition-all duration-200"
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
                className="outline-none btn placeholder:text-white md:placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-white bg-primary  focus:text-primary focus:bg-white focus:placeholder:text-primary md:text-primary md:bg-white md:focus:bg-primary md:focus:text-white md:focus:placeholder-white transition-all duration-200"
                type="password"
                placeholder="johnlovesdogs123"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button
              className="btn text-xl text-white bg-primary md:text-primary md:bg-white mt-8 md:mt-12"
              type="button"
              onClick={(e) => handleSubmission(e)}
            >
              Create account
            </button>

            <p className="text-sm text-center mb-10 md:mb-0">
              Get started today!
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAccountComp;
