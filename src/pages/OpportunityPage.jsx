import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import JobAttribute from "../components/JobAttribute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Opportunity from "../components/Opportunity";
import Search from "../components/Search";
import ApplicationWindow from "../components/ApplicationWindow";

const OpportunityPage = () => {
  let { MobileNavOpen, User } = useContext(AppContext);
  let { organizationId, id } = useParams();
  const [opportunity, setOpportunity] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);

  let isFetched = false;

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.helpinghopedale.org/api/v1/opportunities/${organizationId}/${id}`
        );
        setOpportunity(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load requested opportunity", {
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

    const fetchOpportunities = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://api.helpinghopedale.org/api/v1/opportunities?limit=3"
        );
        setOpportunities(res.data.items);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load opportunities", {
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

    if (!isFetched) {
      fetchOpportunities();
      fetchOpportunity();
    }

    isFetched = true;
  }, [id, organizationId]);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}
      {applying ? (
        <ApplicationWindow
          opportunity={opportunity}
          setApplying={setApplying}
        />
      ) : (
        ""
      )}
      <div className={MobileNavOpen || applying ? "opacity-50" : "opacity-100"}>
        <Navbar />
        <hr className="md:hidden" />
        <div className="hidden md:block">
          <Search
            setLoading={setLoading}
            setOpportunities={setOpportunities}
            limit={3}
          />
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex md:px-10 max-w-7xl mx-auto mt-8 md:12">
            <div className="lg:flex mx-auto flex-col max-w-xl hidden">
              {opportunities.length > 0 ? (
                opportunities.map((opportunity) => (
                  <Opportunity key={opportunity.id} opportunity={opportunity} />
                ))
              ) : (
                <p className="text-gray-500 text-center mx-10 mt-6">
                  No opportunities were found. Please try a different search or
                  try again later.
                </p>
              )}
            </div>

            <div className="flex md:h-fit flex-col mx-6 md:mt-4 md:max-w-2xl md:mx-auto md:border-2 md:p-4 md:rounded-lg md:shadow-lg">
              <div className="flex">
                <Link to="/opportunities" className="mr-auto">
                  <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                    className="text-primary text-5xl md:text-4xl cursor-pointer"
                  />
                </Link>
              </div>

              <h1 className="font-bold text-2xl mt-4">{opportunity.title}</h1>

              <p className="text-gray-500 text-lg">
                {opportunity.organizationName}
              </p>

              {opportunity.location && opportunity.location.zip && (
                <p className="text-gray-500 text-lg">
                  {opportunity.location.city}, {opportunity.location.state}{" "}
                  {opportunity.location.zip}
                </p>
              )}

              <p className="text-gray-500 text-lg">
                {opportunity.applicants} applicants
              </p>
              <div className="flex gap-4 mt-2">
                <JobAttribute type="pay" rate={opportunity.rate} />
                <JobAttribute type="hours" fulltime={opportunity.fulltime} />
              </div>

              <h1 className="text-2xl font-bold mt-4">About this position</h1>
              <div
                className="text-gray-500 list-disc mb-2"
                dangerouslySetInnerHTML={{ __html: opportunity.description }}
              />

              <hr />

              <button
                onClick={() => {
                  if (!User.sub)
                    return toast.error(
                      "Please create an account before applying",
                      {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      }
                    );

                  if (User.account_type === "Organization")
                    return toast.error(
                      "Only account types of volunteer can apply for positions",
                      {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      }
                    );

                  setApplying(true);
                }}
                className="btn text-2xl bg-primary text-white shadow-lg mt-3"
              >
                Apply
              </button>
              <p className="text-gray-500 text-center md:mb-0 mb-10 mt-2">
                Easy apply through PlatePals
              </p>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default OpportunityPage;
