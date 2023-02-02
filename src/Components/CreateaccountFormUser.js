import React, { useState } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { database, storage } from "../firebase";
import { useHistory } from "react-router-dom";

export default function CreateaccountFormUser() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;
  const UserPicture =
    "https://i1.wp.com/devpost-challengepost.netdna-ssl.com/assets/defaults/no-avatar-180.png?ssl=1";
  // const intrests = [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setpin] = useState("");
  const [DOB, setDOB] = useState("");

  // const [collegeName, setCollegeName] = useState("");
  // const [collegeYear, setCollegeYear] = useState("");
  // const [workExperience, setWorkExperience] = useState("");
  // const [specialty, setSpecialty] = useState("");
  // const [otherSpecialty, setOtherSpecialty] = useState("");
  // const [skills, setSkills] = useState("");
  // const [GitHub, setGitHub] = useState("");
  // const [stackOverflow, setStackOverflow] = useState("");
  // const [website, setWebsite] = useState("");
  // const [twitter, setTwitter] = useState("");
  // const [linkedIn, setLinkedIn] = useState("");
  // const [instagram, setInstagram] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // const handleSpecialty = (e) => {
  //   const { value } = e.target;
  //   setSpecialty(value);
  // };

  // const handleIntrests = (e) => {
  //   const target = e.target;
  //   var value = target.value;

  //   if (target.checked) {
  //     intrests.push(value);
  //   } else {
  //     var index = intrests.indexOf(value);
  //     if (index > -1) {
  //       intrests.splice(index, 1);
  //     }
  //   }
  // };

  const createAccount = async (e) => {
    e.preventDefault();

    const response = await fetch(UserPicture);
    const blob = await response.blob();

    // Storing Image to Firebase Storage
    try {
      setError("");
      setLoading(true);
      storage
        .ref(`/pictures/${currentUserId}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("pictures")
            .child(currentUserId)
            .getDownloadURL()
            .then(async (url) => {
              // Storing data and url of image in Realtime database
              const user = {
                UserId: currentUserId,
                Picture: url,
                Email: currentUserEmail,
                FirstName: firstName,
                LastName: lastName,
                Phone: phone,
                address: address,
                City: city,
                Pin: pin,
                DateOfBirth: DOB
              };

              await database.ref("users/" + currentUserId).set(user);
              alert("Account Created Successfully!");
              history.push("/dashboard/");
            });
        });
    } catch {
      setError("Problem Occured during creating account! Try Again");
    }
    setLoading(false);
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={createAccount}>
        <div className="field">
          <div className="field-title">Personal Details</div>
          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={currentUserEmail}
                // onChange={(e) => {
                //   setaddress(e.target.value);
                // }}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City/Town <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City/Town"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="pin" className="form-label">
                Pincode <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="pin"
                placeholder="Pincode"
                value={pin}
                onChange={(e) => {
                  setpin(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <button disabled={loading} type="submit" className="btn submitbtn">
          Submit
        </button>
      </form>
    </>
  );
}
