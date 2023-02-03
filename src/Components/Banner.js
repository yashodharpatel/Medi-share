import React from "react";
import Background from "../assets/banner/banner.png";
import Signup from "./Authentication/Signup";
import NGOSignup from "./NGO Authentication/NGOSignup";

export const Banner = () => {
  return (
    <>
      <div className="banner" id="banner">
        <div className="intro-section">
          <div className="intro-text">
            <div className="main-intro-text">
              <span style={{ color: "#048dbb" }}>Donate, Heal, Repeat</span>
            </div>
            <div className="sub-intro-text" style={{fontWeight:"bolder"}}>
              Unused meds deserve a second chance to make a difference.
            </div>
            <div className="sub-intro-text">
              Medishare is an unused medicine donation platform where anyone can
              donate their unused medicines and we distribute them to the needy
              poor and needy people.
            </div>
          </div>
          <Signup />
          <NGOSignup />
        </div>
        <div className="background">
          <img src={Background} alt="background" className="bannerImage" />
        </div>
      </div>
    </>
  );
};
