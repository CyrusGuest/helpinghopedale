import React from "react";
import { faClock, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobAttribute = ({ type, rate, fulltime, days }) => {
  if (type === "pay")
    return (
      <div className="bg-gray-200 rounded-xl py-2 px-4 flex gap-2">
        <FontAwesomeIcon
          className="text-gray-500 text-lg my-auto"
          icon={faMoneyBill}
        />
        <h1 className="text-gray-600 text-sm">From ${rate}/hr</h1>
      </div>
    );

  if (type === "hours")
    return (
      <div className="bg-gray-200 rounded-xl py-2 px-4 flex gap-2">
        <FontAwesomeIcon
          className="text-gray-500 text-xl my-auto"
          icon={faClock}
        />
        <h1 className="text-gray-600 text-sm">
          {fulltime ? "Full time" : "Part time"}
        </h1>
      </div>
    );

  if (type === "schedule")
    return (
      <div>
        <img src="" alt="" />
        <h1>{days}</h1>
      </div>
    );
};

export default JobAttribute;
