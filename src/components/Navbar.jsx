import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import menuDots from "../images/menu-dots.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import MenuOption from "./MenuOption";

const Navbar = () => {
  const { User, MobileNavOpen, setMobileNavOpen, handleLogout } =
    useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex">
      <Link to="/" className="flex gap-2 w-52 md:w-52 p-4">
        <img src={logo} alt="" className="cursor-pointer my-auto w-52" />
      </Link>

      <div className="my-auto ml-auto hidden md:inline">
        <ul className="flex gap-6 mr-6 text-2xl font-bold ">
          <li className="my-auto hover:-rotate-6 hover:text-3xl duration-200">
            <Link to="/opportunities">opportunities</Link>
          </li>

          {User.email ? (
            <li className="relative my-auto" onClick={toggleDropdown}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-4xl text-primary cursor-pointer hover:rotate-45 hover:text-5xl duration-200"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 p-4 w-48 bg-white rounded-md shadow-md text-base">
                  {/* Dropdown Content */}
                  <ul className="flex flex-col gap-2">
                    <MenuOption title="Account" to="/account" />
                    {User.account_type === "Organization" ? (
                      <MenuOption title="My Listings" to="/listings" />
                    ) : (
                      ""
                    )}

                    <MenuOption
                      title="Logout"
                      onClick={() => {
                        handleLogout();
                      }}
                    />
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <Link to="/signin">
              <li className="my-auto cursor-pointer btn bg-primary text-white glow-on-hover shadow-lg py-2 mt-1 px-6 font-semibold rounded-md transition duration-300">
                sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
      <img
        onClick={() => setMobileNavOpen(!MobileNavOpen)}
        src={menuDots}
        alt=""
        className="my-auto ml-auto mr-4 float-right cursor-pointer md:hidden"
      />
    </div>
  );
};

export default Navbar;
