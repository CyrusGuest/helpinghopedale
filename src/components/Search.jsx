import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Search = ({ setOpportunities, setLoading, limit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.helpinghopedale.org/api/v1/opportunities?searchTerm=${searchTerm}&searchLocation=${searchLocation}&limit=${limit}`
      );
      setOpportunities(res.data.items);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center px-4">
      <h1 className="font-bold text-3xl">Opportunities</h1>
      <p className="text-slate-500 ">
        Explore oppurtunities here - change the world
      </p>

      <form className="flex flex-col gap-4 mt-6 max-w-2xl mx-auto">
        <div className="mx-4 border-2 rounded-lg border-slate-400 flex pl-3 py-4 shadow-lg gap-3">
          <label className="font-bold text-lg">What</label>
          <input
            className="outline-none w-full"
            type="text"
            placeholder="Job title, keyword, or company"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-500 text-2xl mr-4"
          />
        </div>
        <div className="mx-4 border-2 rounded-lg border-slate-400 flex pl-3 py-4 shadow-lg gap-3">
          <label className="font-bold text-lg">Where</label>
          <input
            className="outline-none w-full"
            type="text"
            placeholder="Hopedale, MA"
            onChange={(e) => setSearchLocation(e.target.value)}
            value={searchLocation}
          />
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-gray-500 text-2xl mr-4"
          />
        </div>

        <button
          onClick={(e) => handleSubmission(e)}
          className="mx-4 btn bg-primary text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
