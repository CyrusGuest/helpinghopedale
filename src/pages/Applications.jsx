import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ApplicationReviewCard from "../components/ApplicationReviewCard";

const Applications = () => {
  let { MobileNavOpen, User } = useContext(AppContext);
  let navigate = useNavigate();
  const { listingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  console.log(applications);

  let isFetched = false;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8080/api/v1/listings/${listingId}/applications`
        );
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load opportunities from server", {
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

      setLoading(false);
    };

    if (!isFetched) fetchApplications();
    isFetched = true;
  }, []);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}

      <div className={MobileNavOpen ? "opacity-50" : "opacity-100"}>
        <Navbar />

        <div className="mx-6 mb-96 md:max-w-xl md:mx-auto md:border-2 md:border-slate-400 md:shadow-lg md:rounded-lg md:py-6 md:px-8">
          <div className="flex mt-4 gap-4">
            <div onClick={() => navigate(-1)}>
              <FontAwesomeIcon
                icon={faArrowCircleLeft}
                className="text-primary text-5xl cursor-pointer hover:rotate-[360deg] duration-300"
              />
            </div>
            <div className="flex flex-col mr-auto">
              <h1 className="text-3xl font-bold">Applications</h1>
              <p className="text-gray-500 text-sm">
                Review your listing's applications here
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center my-10">
              <Loading />
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col gap-4 mt-8 mb-96">
            {applications.length < 1 && !loading ? (
              <p className="text-gray-500">
                No applications were founded associated with this listing.
              </p>
            ) : (
              ""
            )}

            {applications.map((application) => (
              <ApplicationReviewCard
                key={application.id}
                application={application}
                setApplications={setApplications}
                applications={applications}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Applications;
