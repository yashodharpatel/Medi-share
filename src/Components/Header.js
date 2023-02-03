import React, { useState } from "react";
import { Link } from "react-router-dom";
import NGOLogin from "./NGO Authentication/NGOLogin"
import Login from "./Authentication/Login"
import Forgotpassword from "./Authentication/Forgotpassword";

export const Header = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <div className="nav banner-nav" id="nav">
      <div className="set-width-1400">
        <div className="inside-nav">
          <div className="d-flex align-items-center justify-content-center">
            <div className="menu-icon" onClick={handleClick}>
              <i className={clicked ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <div className="logo">
              <Link to="/" className="remove-td" style={{ color: "#048dbb" }}>
                medi<span style={{ color: "black" }}>share</span>
              </Link>
            </div>
          </div>
          <ul
            className={
              clicked
                ? "nav-links banner-navlinks"
                : "nav-links banner-navlinks close"
            }
          >
            <li>Support</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div>
          {/* <Login />
          <NGOLogin /> */}
          </div>
        </div>
        <Forgotpassword />
      </div>
    </div>
    </>
  );
};
