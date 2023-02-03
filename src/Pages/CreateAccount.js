import React from "react";
import CreateaccountFormUser from "../Components/CreateaccountFormUser";

export default function Createaccount() {
  return (
    <>
      <div className="create-account">
        <div className="create-account-title">
          <div className="title">Create Profile</div>
          {/* <div className="sub-title">
            We'll use this to connect you with developers and more.
          </div> */}
        </div>
        <div className="create-account-form set-width-1000">
            <CreateaccountFormUser/>
        </div>
      </div>
    </>
  );
}
