import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SignInComp from "../components/SignInComp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

const SignIn = () => {
  let { MobileNavOpen } = useContext(AppContext);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}
      <div className={MobileNavOpen ? "opacity-50" : "opacity-100"}>
        <Navbar />

        <SignInComp />

        <Footer />
      </div>
    </div>
  );
};

export default SignIn;
