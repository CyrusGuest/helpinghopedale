import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";
import ResetPasswordComp from "../components/ResetPasswordComp";

const ResetPassword = () => {
  let { MobileNavOpen } = useContext(AppContext);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}

      <div className={MobileNavOpen ? "opacity-50" : "opacity-100"}></div>
      <Navbar />

      <ResetPasswordComp />

      <Footer />
    </div>
  );
};

export default ResetPassword;
