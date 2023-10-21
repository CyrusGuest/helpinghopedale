import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import BarCarousel from "../components/BarCarousel";
import LandingGraphic from "../components/LandingGraphic";
import ExploreGraphic from "../components/ExploreGraphic";

const Landing = () => {
  let { MobileNavOpen } = useContext(AppContext);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}

      <div className={MobileNavOpen ? "opacity-50" : "opacity-100"}>
        <Navbar />

        <Hero />

        <LandingGraphic />

        <BarCarousel />

        <ExploreGraphic />

        <Footer />
      </div>
    </div>
  );
};

export default Landing;
