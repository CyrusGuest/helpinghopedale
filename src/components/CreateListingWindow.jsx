import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateListingWindow = ({ setCreating }) => {
  let { User } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [pay, setPay] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);
  const [description, setDescription] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log(User.sub);

  const handleSubmission = async () => {
    const opportunity = {
      title,
      rate: pay,
      location,
      fulltime,
      description,
      additionalQuestions,
      organizationId: User.sub,
      organizationName: User.name,
      id: Date.now(),
    };

    try {
      const result = await axios.post(
        "https://api.platepals.org/api/v1/opportunities",
        opportunity
      );

      setLoading(false);

      toast.success("Opportuity created ✅", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setCreating(false);
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

  const handleNext = () => {
    if (title === "" || pay === "" || location === "")
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

    if (page === 3) {
      if (description === "")
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

      handleSubmission();
    }

    if (page !== 3) return setPage(page + 1);
  };

  const pageThree = (
    <div className="flex flex-col gap-4 md:mt-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="apikey">
          Description
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
          placeholder="Begin writing your position description here..."
        />
      </div>

      <button
        type="submit"
        className="btn bg-white text-lg mt-6"
        onClick={handleNext}
      >
        Create opportunity
      </button>
    </div>
  );

  const pageTwo = (
    <div className="flex flex-col gap-4 md:mt-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="apikey">
          Additional Questions
        </label>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <label htmlFor="">None</label>
            <input
              type="radio"
              onChange={(e) => {
                setAdditionalQuestions([]);
              }}
              value={0}
              name="fulltime"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="">1</label>
            <input
              type="radio"
              onChange={(e) => {
                setAdditionalQuestions([""]);
              }}
              value={1}
              name="fulltime"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <div className="flex gap-1">
            <label htmlFor="">2</label>
            <input
              type="radio"
              onChange={(e) => {
                setAdditionalQuestions(["", ""]);
              }}
              value={2}
              name="fulltime"
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <div className="flex gap-1">
            <label htmlFor="">3</label>
            <input
              type="radio"
              onChange={(e) => {
                setAdditionalQuestions(["", "", ""]);
              }}
              value={3}
              name="fulltime"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {additionalQuestions.map((_, index) => (
        <div className="flex flex-col" key={index}>
          <label className="font-bold" htmlFor={`additionalQuestion${index}`}>
            Additional Question {index + 1}
          </label>
          <input
            id={`additionalQuestion${index}`}
            className="outline-none btn placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
            type="text"
            placeholder="Question goes here"
            value={additionalQuestions[index]}
            onChange={(e) => {
              let newAdditonalQuestionsArr = [...additionalQuestions];
              newAdditonalQuestionsArr[index] = e.target.value;
              setAdditionalQuestions(newAdditonalQuestionsArr);
            }}
          />
        </div>
      ))}

      <button
        type="submit"
        className="btn bg-white text-lg mt-6"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );

  const pageOne = (
    <div className="flex flex-col gap-4 md:mt-6">
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="apikey">
          Opportunity Title
        </label>
        <input
          name="title"
          className="outline-none btn  placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
          type="text"
          placeholder="Digital Coordinator"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold" htmlFor="apikey">
          Opportunity Pay Rate (per hour)
        </label>
        <input
          className="outline-none btn  placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
          type="text"
          placeholder="0.00"
          onChange={(e) => setPay(e.target.value)}
          value={pay}
          name="pay"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold" htmlFor="apikey">
          Opportunity Location
        </label>
        <input
          className="outline-none btn  placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
          type="text"
          placeholder="Boston, MA"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          name="location"
        />
      </div>

      <div className="flex gap-2">
        <label className="font-bold" htmlFor="apikey">
          Fulltime
        </label>
        <input
          type="checkbox"
          onChange={() => {
            setFulltime(!fulltime);
          }}
          checked={fulltime}
          name="fulltime"
          className="w-6 h-6 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="btn bg-white text-lg mt-6"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="p-10 h-full md:h-fit w-full flex flex-col justify-center z-20 max-w-2xl bg-gray-200 rounded-lg shadow-lg fixed left-1/2 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2">
      <div className="flex gap-2">
        <FontAwesomeIcon
          className="text-4xl cursor-pointer my-auto"
          icon={faArrowCircleLeft}
          onClick={() => {
            if (page > 1) return setPage(page - 1);
            setCreating(false);
          }}
        />
        <h1 className="text-3xl font-bold">Create a new listing</h1>
      </div>
      <p className="text-gray-500 md:mb-0 mb-10">
        Start recruiting for volunteers today
      </p>

      {page === 1 ? pageOne : ""}
      {page === 2 ? pageTwo : ""}
      {page === 3 ? pageThree : ""}
    </div>
  );
};

export default CreateListingWindow;
