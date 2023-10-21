import React from "react";

const ApplicationCard = ({ application }) => {
  return (
    <div
      className={`${
        application.status === "Open" ? "cursor-pointer" : ""
      } border-2 rounded-lg border-slate-400 text-gray-500 relative px-3 py-4 shadow-lg text-sm `}
    >
      <h1 className="text-black font-bold text-lg">
        {application.opportunityTitle} -{" "}
        <span
          className={`${
            application.status === "Open" ? "text-gray-500" : "text-red-600"
          }`}
        >
          {application.status}
        </span>
      </h1>

      <p>{application.opportunityOrganization}</p>
      <p>{application.opportunityLocation}</p>
      <p>Date Submitted: {application.dateSubmitted}</p>
    </div>
  );
};

export default ApplicationCard;
