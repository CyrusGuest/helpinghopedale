import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import CreateAccountComp from "../components/CreateAccountComp";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

const CreateAccount = () => {
  let { MobileNavOpen } = useContext(AppContext);

  return (
    <div>
      {MobileNavOpen ? <MobileNav /> : ""}

      <div className={MobileNavOpen ? "opacity-50" : "opacity-100"}></div>
      <Navbar />

      <CreateAccountComp />

      <Footer />
    </div>
  );
};

export default CreateAccount;
