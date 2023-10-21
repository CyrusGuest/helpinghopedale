import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ApplicationReviewCard from "../components/ApplicationReviewCard";
import PDFViewer from "../components/PDFViewer";

const ApplicationPage = () => {
  let { MobileNavOpen } = useContext(AppContext);
  let { listingId, id } = useParams();
  const [application, setApplication] = useState({});
  const [applications, setApplications] = useState([]);
  const [associatedListing, setAssociatedListing] = useState({
    additionalQuestions: [],
  });
  const [loading, setLoading] = useState(false);
  const [viewResume, setViewResume] = useState(false);
  let navigate = useNavigate();

  console.log(associatedListing.additionalQuestions);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchAssociatedListing = async (orgId, oppId) => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/v1/opportunities/${orgId}/${oppId}`
        );
        setAssociatedListing(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load associated listing", {
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

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8080/api/v1/listings/${listingId}/applications`
        );
        setApplications(res.data);

        // Using the recently fetched data directly, not the stale state
        const specificApplication = res.data.filter(
          (filterApplication) => filterApplication.id !== id
        );
        setApplication(specificApplication[0]);
        fetchAssociatedListing(
          res.data[0].organizationId,
          res.data[0].opportunityId
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load applications", {
          /* ...toast config */
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications(); // You don't need isFetched flag here. Dependency array will take care of it
  }, [id, listingId, application.opportunityId, application.organizationId]);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}

      {viewResume ? (
        <PDFViewer
          id={id}
          setViewResume={setViewResume}
          application={application}
          associatedListing={associatedListing}
        />
      ) : (
        ""
      )}

      <div
        className={MobileNavOpen || viewResume ? "opacity-50" : "opacity-100"}
      >
        <div className="hidden md:block">
          <Navbar />

          <div className="text-center my-6 hidden md:block">
            <h1 className="font-bold text-3xl">Applications</h1>
            <p className="text-slate-500 ">
              View specific applications for your listing here
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex md:px-10 max-w-6xl mx-auto mt-12 mb-96">
            <div className="lg:flex mx-auto flex-col gap-4 w-1/3 hidden">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <ApplicationReviewCard
                    key={application.id}
                    application={application}
                    applications={applications}
                    setApplications={setApplications}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center mx-10 mt-6">
                  No applications were found associated with this listing.
                </p>
              )}
            </div>

            <div className="flex md:h-fit flex-col mx-6  md:max-w-2xl md:mx-auto md:border-2 md:p-4 md:rounded-lg md:shadow-lg w-full">
              <div className="flex">
                <Link
                  to={`/listings/${listingId}/applications`}
                  className="mr-auto"
                >
                  <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                    className="text-primary text-5xl cursor-pointer hover:rotate-[360deg] duration-300"
                  />
                </Link>

                <Link to="/" className="float-right">
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-5xl text-primary"
                  />
                </Link>
              </div>

              <div className="text-center my-6 block md:hidden">
                <h1 className="font-bold text-3xl">Applications</h1>
                <p className="text-slate-500 ">
                  View specific applications for your listing here
                </p>
              </div>

              <h1 className="font-bold text-2xl mt-4">
                Name: {application.name}
              </h1>

              <p className="text-gray-500 text-lg">
                Email: {application.email}
              </p>

              <p className="text-gray-500 text-lg">
                Mobile: {application.mobile}
              </p>

              <p className="text-gray-500 text-lg">
                Date submitted: {formatDate(application.dateSubmitted)}
              </p>
              <button
                onClick={() => setViewResume(true)}
                className="font-bold text-2xl mt-4 btn bg-primary text-white"
              >
                View resume
              </button>

              <hr className="mt-4" />

              <h1 className="font-bold text-2xl mt-4">Additional Questions:</h1>

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
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default ApplicationPage;
