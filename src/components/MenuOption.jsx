import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MenuOption = ({ title, onClick, to, icon = faArrowRight }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className={`hover:bg-gray-200 cursor-pointer font-bold text-black rounded-lg p-2 flex ${
        isHovered ? "bg-gray-200" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={to}
      onClick={onClick}
    >
      <h1 className="mr-auto">{title}</h1>
      <FontAwesomeIcon
        className={`text-xl text-gray-500 my-auto ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        icon={icon}
      />
    </Link>
  );
};

export default MenuOption;
