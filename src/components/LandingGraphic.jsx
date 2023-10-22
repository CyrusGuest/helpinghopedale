import React from "react";
import { Link } from "react-router-dom";
import MainGraphic from "../images/landinggraphic.jpg";

const LandingGraphic = () => {
  return (
    <div className="mb-36 mt-20 md:mt-28 lg:mt-40 flex flex-col-reverse lg:flex-row-reverse gap-8">
      <div className="lg:mr-20 flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl md:text-5xl font-bold">
          Welcome to Helping Hopedale!
        </h1>

        <div className="max-w-xs md:max-w-2xl mt-4">
          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className="font-bold">
              Helping Hopedale - Connecting Volunteers and Community Needs
            </span>{" "}
            We're here to bridge the gap between those who want to make a
            difference and those who need a helping hand in Hopedale and
            surrounding communities. Whether you're seeking volunteers or
            looking to volunteer, Helping Hopedale is your platform to create
            positive change.
          </p>

          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className=" font-bold">Make an Impact Today!</span> If you
            could use some help, create listings for volunteer opportunities,
            share your needs, and connect with dedicated individuals eager to
            help. If you're an individual with a heart for volunteering, explore
            our listings and join hands with your neighbors to build a stronger
            community together.
          </p>

          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className=" font-bold">
              Together, We Strengthen Hopedale and Beyond.
            </span>{" "}
            Every helping hand counts, and your involvement can make a world of
            difference. Join our community today, and let's build a brighter,
            more supportive future for Hopedale and its neighbors.
          </p>
        </div>

        <Link
          to="/opportunities"
          className="text-center btn xxw-72 font-bold bg-white text-black rounded-lg shadow-lg glow-on-hover mt-10 text-2xl mx-auto"
        >
          Explore Opportunities
        </Link>
      </div>

      <img
        className="mx-auto w-4/5 lg:w-2/5 lg:mt-20 lg:mb-40 lg:ml-16 object-contain"
        src={MainGraphic}
        alt=""
      />
    </div>
  );
};

export default LandingGraphic;
