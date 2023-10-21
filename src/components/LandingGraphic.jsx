import React from "react";
import { Link } from "react-router-dom";
import MainGraphic from "../images/landinggraphic.jpg";

const LandingGraphic = () => {
  return (
    <div className="mb-36 mt-20 md:mt-28 lg:mt-60 flex flex-col-reverse lg:flex-row-reverse gap-8">
      <div className="lg:mr-20 flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl md:text-5xl font-bold">
          Welcome to Helping Hopedale!
        </h1>

        <div className="max-w-xs md:max-w-2xl mt-4">
          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className="font-bold">
              Welcome to Helping Hopedale, the bridge between goodwill and
              community support.
            </span>{" "}
            We're on a mission to connect passionate volunteers with
            organizations and individuals in Hopedale and surrounding
            communities, creating a strong network of care across our region.
            Helping Hopedale is more than a platform - it's a movement towards a
            world where everyone has access to support and assistance.
          </p>

          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className=" font-bold">Join us to make a difference.</span> By
            volunteering through Helping Hopedale, you're not just giving your
            time; you're making a positive impact in the lives of our neighbors,
            supporting local communities, and building a stronger community
            together. Let's work together to create a better future for all.
          </p>

          <p className="text-center mx-auto mt-2 md:mt-6 md:text-xl">
            <span className=" font-bold">
              Together, we are Helping Hopedale - connecting hearts and building
              communities.
            </span>{" "}
            Because in the effort to make our community stronger, every helping
            hand makes a world of difference. Connect with us today, and let's
            create a brighter, more supportive future for Hopedale and beyond.
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
        className="mx-auto w-4/5 lg:w-2/5 lg:mt-20 lg:mb-40 lg:ml-16 object-contain"
        src={MainGraphic}
        alt=""
      />
    </div>
  );
};

export default LandingGraphic;
