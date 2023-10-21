import React from "react";

const MissionInfo = () => {
  return (
    <div className="mb-10 max-w-sm md:max-w-none mx-auto mt-10 md:mt-22 lg:mt-30 flex flex-col lg:flex-row gap-8 justify-center">
      <p className="flex-col my-auto btn bg-primary text-white glow-on-hover shadow-lg py-4 px-8 lg:py-4 lg:px-20 rounded-md transition duration-300 text-center">
        <span className="text-bold text-2xl">12.5% of U.S. households</span>
        <br />
        <span className="text-normal text-xs">are food insecure</span>
      </p>

      <p className="flex-col my-auto cursor-pointer btn bg-primary text-white glow-on-hover shadow-lg py-4 px-8 lg:py-4 lg:px-20 rounded-md transition duration-300 text-center">
        <span className="text-bold text-2xl">15.3% of all children</span>
        <br />
        <span className="text-normal text-xs">
          in the US live in food insecure households <br />
        </span>
      </p>
    </div>
  );
};

export default MissionInfo;
