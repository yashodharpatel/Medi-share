import React from "react";
import Createaccountformdonar from "../Components/Createaccountformdonar";
import CreateaccountFormReceiver from "../Components/CreateaccountFormReceiver";
import CreateaccountFormVolunteer from "../Components/CreateaccountFormVolunteer";

export default function Createaccount() {
  const formRender = localStorage.getItem("formRender");
  return (
    <>
      <div className="create-account">
        <div className="create-account-title">
          <div className="title">Create Profile</div>
          <div className="sub-title">
            We'll use this to connect you with developers and more.
          </div>
        </div>
        <div className="create-account-form set-width-1000">
          {formRender === "donar" ? <Createaccountformdonar /> : null}
          {formRender === "recepient" ? <CreateaccountFormReceiver /> : null}
          {formRender === "volunteer" ? <CreateaccountFormVolunteer /> : null}
        </div>
      </div>
    </>
  );
}
