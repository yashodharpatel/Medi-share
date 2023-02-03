import React from "react";
import Card from "react-bootstrap/Card";
import Login from "../Components/Authentication/Login";
import NGOLogin from "../Components/NGO Authentication/NGOLogin";

export const Cards = () => {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center mb-4">
      <Login/>
      <NGOLogin/>
    </div>
      
    </>
  );
};
