import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ApplicationWindow = ({ opportunity, setApplying }) => {
  let { User } = useContext(AppContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [mobile, setMobile] = useState("");
  const [additionalResponses, setAdditionalResponses] = useState([]);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (opportunity.additionalQuestions === undefined) return;

    if (opportunity.additionalQuestions.length > 0)
      setAdditionalQuestions(opportunity.additionalQuestions);
  }, [opportunity.additionalQuestions]);

  const handleResponseChange = (index, value) => {
    const newResponses = [...additionalResponses];
    newResponses[index] = value;
    setAdditionalResponses(newResponses);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (email === "" || resume === "" || mobile === "")
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
      return toast.error("Please enter a valid email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    const formData = new FormData();
    formData.append("id", Date.now());
    formData.append("userId", User.sub);
    formData.append("additionalQuestionsResponses", additionalResponses);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("mobile", mobile);
    formData.append("opportunityId", opportunity.id);
    formData.append("opportunityLocation", `${opportunity.location}`);
    formData.append("opportunityOrganization", opportunity.organizationName);
    formData.append("opportunityTitle", opportunity.title);
    formData.append("organizationId", opportunity.organizationId);
    formData.append("status", "Open");
    formData.append("dateSubmitted", new Date().toISOString());
    formData.append("name", User.name);
    formData.append("reviewed", false);
    additionalResponses.forEach((response, index) => {
      formData.append(`response${index + 1}`, response);
    });

    setLoading(true);

    try {
      const result = await axios.post(
        "https://api.platepals.org/api/v1/apply",
        formData
      );

      setLoading(false);

      toast.success("Application submitted ✅", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setApplying(false);
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

  const handleResumeChange = (e) => {
    let selectedFile = e.target.files[0];

    // Add file type validation here
    const fileType = selectedFile.type;
    const validFileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.apple.pages",
    ];

    if (!validFileTypes.includes(fileType)) {
      toast.error("Please upload a PDF, DOCX, or Pages document", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    setResume(selectedFile);
  };

  return (
    <div className="p-10 h-full md:h-fit w-full flex flex-col justify-center z-20 max-w-2xl bg-gray-200 rounded-lg shadow-lg fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
      <div className="flex gap-2">
        <FontAwesomeIcon
          className="text-4xl cursor-pointer my-auto"
          icon={faArrowCircleLeft}
          onClick={() => setApplying(false)}
        />
        <h1 className="text-3xl font-bold">Apply Now</h1>
      </div>
      <p className="text-gray-500 md:mb-0 mb-10">
        Easy apply through PlatePals
      </p>

      {loading ? (
        <div className="my-10 mx-auto">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:mt-6">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="apikey">
              Email*
            </label>
            <input
              name="email"
              className="outline-none btn  placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
              type="text"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold" htmlFor="apikey">
              Mobile Number*
            </label>
            <input
              className="outline-none btn  placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
              type="text"
              placeholder="123-456-7891"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              name="mobile"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold" htmlFor="apikey">
              Resume*
            </label>
            <input
              className="outline-none btn flex gap-4 placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1    text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
              type="file"
              name="resume"
              accept=".pdf, .docx, application/vnd.apple.pages"
              onChange={(e) => handleResumeChange(e)}
            />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {additionalQuestions.map((question, index) => (
              <div className="flex flex-col" key={index}>
                <label className="font-bold">{question}*</label>
                <input
                  className="outline-none btn  placeholder:text-gray-500 border-none shadow-lg rounded-lg p-2 mt-1 text-primary bg-white focus:bg-primary focus:text-white focus:placeholder-white transition-all duration-200"
                  type="text"
                  name={`response${index + 1}`}
                  placeholder="Your response..."
                  value={additionalResponses[index] || ""}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn bg-white text-lg mt-6"
            onClick={(e) => handleSubmission(e)}
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationWindow;
