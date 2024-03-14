import React, { useContext } from "react";
import themeContext from "./context/theme_context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useContext(themeContext);
  return (
    <nav
      className={`flex justify-around  shadow-lg ${
        theme.theme ? "bg-white text-black" : "bg-[#1c1c1c] text-white"
      }`}
    >
      <Link
        to="/"
        className={`no-underline ${theme.theme ? "text-black" : "text-white"} `}
      >
        <p className="text-xl">{process.env.WEB_TITLE}</p>
      </Link>
      <div>
        <p className="text-lg">
          <span
            className="mx-4 cursor-pointer"
            onClick={() => theme.updateTheme()}
          >
            {theme.theme ? "☀️" : "🌙"}
          </span>
          About
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
