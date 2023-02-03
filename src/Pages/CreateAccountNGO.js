import React from 'react'
import CreateaccountFormNGO from '../Components/CreateaccountFormNGO';

export default function CreateAccountNGO() {
  return (
    <>
      <div className="create-account">
        <div className="create-account-title">
          <div className="title">Create NGO Profile</div>
          {/* <div className="sub-title">
            We'll use this to connect you with developers and more.
          </div> */}
        </div>
        <div className="create-account-form set-width-1000">
            <CreateaccountFormNGO/>
        </div>
      </div>
    </>
  );
}
