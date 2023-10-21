import React from "react";
import JobAttribute from "./JobAttribute";
import { Link } from "react-router-dom";

const Opportunity = ({ opportunity }) => {
  return (
    <Link
      to={`/opportunities/${opportunity.organizationid}/${opportunity.id}`}
      className="m-4 border-2 rounded-lg p-4 shadow-lg cursor-pointer"
    >
      <h1 className="font-bold">{opportunity.title}</h1>
      <h3 className="text-slate-600">{opportunity.organizationname}</h3>
      <h3 className="text-slate-600">{opportunity.location}</h3>

      <div className="flex gap-3 mt-2">
        <JobAttribute type="pay" rate={opportunity.rate} />
        <JobAttribute type="hours" fulltime={opportunity.fulltime} />
      </div>

      <ul className="list-disc mt-3 text-sm text-gray-500 max-h-32 w-11/12 overflow-hidden overflow-ellipsis">
        <div dangerouslySetInnerHTML={{ __html: opportunity.description }} />
      </ul>

      <button className="btn bg-primary text-white w-full mt-2">View</button>
    </Link>
  );
};

export default Opportunity;
