import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import MissionHeading from "../components/MissionHeading";
import Footer from "../components/Footer";
import MissionInfo from "../components/MissionInfo";
import MissionStats from "../components/MissionStats";
import Divider from "../components/Divider";
import PaData from "../images/PaData.jpg";

const Mission = () => {
  let { MobileNavOpen } = useContext(AppContext);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}

      <div className={MobileNavOpen ? "opacity-50" : "opacity-100"}>
        <Navbar />

        <MissionHeading />

        <MissionInfo />

        <MissionStats />

        <div className="flex justify-center">
          <img
            className="rounded-md w-3/5 lg:w-3/5 pb-10 pt-10"
            src={PaData}
            alt=""
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Mission;
