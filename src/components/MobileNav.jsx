import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import arrow from "../images/arrow.svg";
import logo from "../images/small-logo.svg";
import menuDots from "../images/menu-dots.svg";

const MobileNav = () => {
  let { User, setMobileNavOpen } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  console.log(User);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setMobileNavOpen(false);
  };

  return (
    <div
      className={`fixed z-20 w-3/4 h-full bg-white right-0 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex mt-4 ml-4">
        <img
          onClick={handleClose}
          src={arrow}
          alt=""
          className="cursor-pointer mr-8 mt-2"
        />
        <img src={logo} alt="" className="cursor-pointer mx-auto w-12 mt-4" />
        <img
          onClick={handleClose}
          src={menuDots}
          alt=""
          className="cursor-pointer ml-auto mr-4 mt-4"
        />
      </div>

      <div className="flex flex-col px-6 mt-10 gap-10">
        <ul className="text-2xl ">
          <h1 className="font-bold text-5xl text-gradient">volunteer</h1>
          <Link onClick={handleClose} to="/opportunities">
            <h4 className="mt-1">opportunities</h4>
          </Link>

          {User.account_type === "Organization" ? (
            <Link onClick={handleClose} to="/listings">
              <h4 className="mt-1">my listings</h4>
            </Link>
          ) : (
            ""
          )}
        </ul>

        {User.email ? (
          <Link
            onClick={handleClose}
            className="btn bg-primary text-white text-2xl text-center fixed bottom-10 w-11/12"
            to="/account"
          >
            account
          </Link>
        ) : (
          <Link
            onClick={handleClose}
            className="btn bg-primary text-white text-2xl text-center fixed bottom-10 w-10/12"
            to="/signin"
          >
            sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
