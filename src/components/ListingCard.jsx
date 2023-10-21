import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuOption from "./MenuOption";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const ListingCard = ({ listing }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className={`${
        listing.status === "Open" ? "cursor-pointer" : ""
      } border-2 rounded-lg border-slate-400 text-gray-500 relative px-3 py-4 shadow-lg text-sm `}
    >
      <h1 className="text-black font-bold text-lg">
        {listing.title} -{" "}
        <span
          className={`${
            listing.status === "Open" ? "text-gray-500" : "text-red-600"
          }`}
        >
          {listing.status}
        </span>
      </h1>

      <p>{listing.organizationname}</p>
      <p>{listing.location}</p>
      <p>{listing.applicants} applicants</p>

      <div className="flex gap-2 mt-4">
        <button
          className="btn text-white bg-primary w-full text-lg"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          View
        </button>
        <div className="btn bg-primary text-white">
          <FontAwesomeIcon icon={faPencil} className="text-2xl " />
        </div>

        {dropdownOpen && (
          <div className=" absolute z-10 left-14 mt-8 p-4 w-48 bg-white rounded-md shadow-md text-base">
            {/* Dropdown Content */}
            <ul className="flex flex-col gap-2">
              <MenuOption
                title="Your Listing"
                to={`/opportunities/${listing.organizationid}/${listing.id}`}
              />

              <MenuOption
                title="Applicants"
                to={`/listings/${listing.id}/applications`}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
