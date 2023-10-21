import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard.jsx";
import Loading from "../components/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CreateListingWindow from "../components/CreateListingWindow";

const Landing = () => {
  let { MobileNavOpen, User } = useContext(AppContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [creating, setCreating] = useState(false);

  let isFetched = false;

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.helpinghopedale.org/api/v1/opportunities?organizationId=${User.sub}`
        );
        setOpportunities(res.data.items);
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

    if (!isFetched) fetchOpportunities();
    isFetched = true;
  }, []);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}
      {creating ? <CreateListingWindow setCreating={setCreating} /> : ""}

      <div className={MobileNavOpen || creating ? "opacity-50" : "opacity-100"}>
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
              <h1 className="text-3xl font-bold">My Listings</h1>
              <p className="text-gray-500 text-sm">
                Create, edit, and manage your listings here
              </p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="text-primary opacity-0 md:opacity-100 my-auto text-5xl md:text-7xl md:fixed bottom-7 right-10 cursor-pointer hover:rotate-[90deg] duration-300"
                onClick={() => setCreating(true)}
              />
            </div>
          </div>

          <button
            className="btn md:hidden bg-primary text-lg text-white w-full mt-4"
            onClick={() => setCreating}
          >
            Create Listing
          </button>

          {loading ? (
            <div className="flex justify-center my-10">
              <Loading />
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col gap-4 mt-8 mb-96">
            {opportunities.length < 1 && !loading ? (
              <p className="text-gray-500">
                No opportunities were found associated with this account.
              </p>
            ) : (
              ""
            )}

            {opportunities.map((opportunity) => (
              <ListingCard key={opportunity.id} listing={opportunity} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
