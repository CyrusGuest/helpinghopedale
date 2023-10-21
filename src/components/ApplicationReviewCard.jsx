import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuOption from "./MenuOption";
import axios from "axios";

const ApplicationReviewCard = ({
  application,
  setApplications,
  applications,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const updateReviewedStatus = async (status) => {
    setDropdownOpen(false);
    let newApplications = [...applications];
    const index = newApplications.indexOf(application);
    newApplications = newApplications.filter(
      (filterApp) => filterApp.id !== application.id
    );

    let newApplication = { ...application, reviewed: status };
    newApplications.splice(index, 0, newApplication);

    setApplications(newApplications);

    await axios.put(
      `http://localhost:8080/api/v1/applications/${application.id}`,
      newApplication
    );
  };

  return (
    <div className="border-2 rounded-lg border-slate-400 text-slate-600 relative px-3 py-4 shadow-lg text-sm">
      <h1 className="font-bold text-black text-lg">
        {application.name} -{" "}
        {application.reviewed === "true" ? (
          <span className="text-green-600 font-bold">Reviewed</span>
        ) : (
          <span className="text-slate-600 font-bold">Unreviewed</span>
        )}
      </h1>
      <h3>Email: {application.email}</h3>
      <h3>Tel: {application.mobile}</h3>
      <h3>Date submitted: {formatDate(application.dateSubmitted)}</h3>

      <div className="flex gap-2 mt-4">
        <Link
          className="btn text-white bg-primary w-full text-lg"
          to={`/listings/${application.opportunityId}/applications/${application.id}`}
        >
          View
        </Link>
        <div
          className="btn bg-primary text-white"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FontAwesomeIcon icon={faCheck} className="text-2xl" />
        </div>

        {dropdownOpen && (
          <div className=" absolute z-10 left-72 mt-8 p-4 w-48 bg-white rounded-md shadow-md text-base">
            {/* Dropdown Content */}
            <ul className="flex flex-col gap-2">
              <MenuOption
                title="Reviewed"
                icon={faCheck}
                onClick={() => {
                  updateReviewedStatus("true");
                }}
              />

              <MenuOption
                title="Unreviewed"
                icon={faX}
                onClick={() => {
                  updateReviewedStatus("false");
                }}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationReviewCard;
