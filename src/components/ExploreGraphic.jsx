import React from "react";
import { Link } from "react-router-dom";
import ExploreGraphicImg from "../images/exploregraphic.jpg";

const ExploreGraphic = () => {
  return (
    <div className="mb-32 mt-20 md:mt-28 lg:mt-40 flex flex-col-reverse lg:flex-row-reverse gap-8">
      <div className="lg:mr-20 flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl md:text-5xl font-bold">
          Why Volunteer?
        </h1>

        <div className="max-w-xs md:max-w-2xl mt-4">
          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className="font-bold">Unleash Your Potential.</span>{" "}
            Volunteering is more than lending a helping hand; it's a pathway to
            personal growth and development. It empowers you to step out of your
            comfort zone, acquire new skills, and connect with people from
            diverse backgrounds.
          </p>

          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className="font-bold">Make a Real Difference</span>. When you
            volunteer, you contribute directly to causes that matter to you. You
            see the impact of your work in real-time, whether it's a well-fed
            family, a cleaned-up park, or a thriving local community.
          </p>

          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className="font-bold">Create a Ripple Effect.</span> The power
            of volunteering lies in its ability to inspire others. When you
            contribute your time and energy, you ignite a spark in those around
            you to do the same. Join us as a volunteer at HelpingHopedale, and
            let's amplify the wave of positive change together.
          </p>
        </div>

        <Link
          to="/opportunities"
          className="text-center btn xxw-72 font-bold bg-white text-black rounded-lg shadow-lg glow-on-hover mt-10 text-2xl mx-auto"
        >
          Learn More
        </Link>
      </div>

      <img
        className="mx-auto w-3/5 lg:w-2/5 mb-10 max-w-4xl lg:mb-40 object-cover lg:ml-16"
        src={ExploreGraphicImg}
        alt=""
      />
    </div>
  );
};

export default ExploreGraphic;
