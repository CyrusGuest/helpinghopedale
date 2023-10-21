import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

const PDFViewer = ({ id, setViewResume, application, associatedListing }) => {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchApplicationResume = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.helpinghopedale.org/api/v1/applications/${id}/resume`,
        { responseType: "blob" }
      );

      return res;
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requested application resume", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mutilatePdf = async () => {
      const { data } = await fetchApplicationResume();

      const pdfUrl = URL.createObjectURL(data);
      setPdfData(pdfUrl);
    };

    mutilatePdf();
  }, []);

  return (
    <div className="absolute opacity-100 w-5/6 mt-4 md:mt-0 h-full md:h-5/6 left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-xl">
      <div className="flex flex-col h-full gap-4">
        <div className="flex gap-4">
          <div onClick={() => setViewResume(false)} className="mr-auto">
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="text-primary text-5xl cursor-pointer hover:rotate-[360deg] duration-300"
            />
          </div>
          <h1 className="font-bold text-3xl text-left my-auto w-full">
            Resume Viewer
          </h1>
        </div>

        <div className="flex h-full ">
          <div className="lg:w-1/3 hidden lg:block">
            <h1 className="font-bold text-2xl mt-4">
              Name: {application.name}
            </h1>

            <p className="text-gray-500 text-lg">Email: {application.email}</p>

            <p className="text-gray-500 text-lg">Tel: {application.mobile}</p>

            <p className="text-gray-500 text-lg">
              Date submitted: {formatDate(application.dateSubmitted)}
            </p>

            <hr className="mt-2 w-11/12" />

            <h1 className="font-bold text-2xl mt-2">Additional Questions:</h1>

            {associatedListing.additionalQuestions.length > 0 ? (
              <div>
                {associatedListing.additionalQuestions.map(
                  (additionalQuestion, i) => (
                    <p className="text-gray-500 text-lg mb-4" key={i}>
                      {additionalQuestion}:{" "}
                      {application.additionalQuestionsResponses.split(",")[i]}
                    </p>
                  )
                )}
              </div>
            ) : null}
          </div>

          {pdfData ? (
            <object
              data={pdfData}
              type="application/pdf"
              className="h-full lg:w-2/3 w-full rounded-lg shadow-xl"
            >
              <p>
                It appears you don't have a PDF plugin for this browser. No
                worries... you can <a href={pdfData}>download the PDF</a> to
                view it!
              </p>
            </object>
          ) : (
            <div className="mx-auto my-auto">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
