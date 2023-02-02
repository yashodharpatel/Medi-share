import React from 'react'
import Background from "../assets/banner/banner.jpeg";
import Signup from "./Authentication/Signup";


export const Banner = () => {
  return (
    <div className="banner" id="banner">
    <div className="intro-section">
      <div className="intro-text">
        <div className="main-intro-text">
          {"<Hello"} <span style={{ color: "#048dbb" }}>{"Developers"}</span>
          {"/>"}
        </div>
        <div className="sub-intro-text">
          These is where you can find your perfect coding partner with whom
          you can code and make projects.
        </div>
      </div>
      <Signup />
    </div>
    <div className="background">
      <img src={Background} alt="background" className="bannerImage"/>
    </div>
  </div>
  )
}
