import React, { useState } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { database, storage } from "../firebase";
import { useHistory } from "react-router-dom";

export default function CreateaccountFormNGO() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;
  const NGOPicture =
    "https://i1.wp.com/devpost-challengepost.netdna-ssl.com/assets/defaults/no-avatar-180.png?ssl=1";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setpin] = useState("");
  const [taxIDNo, settaxIDNo] = useState("");
  const [ngoID, setngoID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const createAccount = async (e) => {
    e.preventDefault();

    const response = await fetch(NGOPicture);
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
                Name: name,
                Phone: phone,
                address: address,
                City: city,
                Pin: pin,
                TaxID: taxIDNo,
                NGOID: ngoID,
              };

              await database.ref("ngos/" + currentUserId).set(user);
              alert("Account Created Successfully!");
              history.push("/ngo-dashboard/");
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
          <div className="field-title">NGO Details</div>
          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                NGO Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="NGO Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
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
          </div>

          <div className="change-display">
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
          </div>

          <div className="change-display">
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
          </div>

          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="taxIDNo" className="form-label">
                Tax ID No <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="taxIDNo"
                placeholder="NGO Tax ID No"
                value={taxIDNo}
                onChange={(e) => {
                  settaxIDNo(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ngoID" className="form-label">
                NGO Darpan ID <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="ngoID"
                placeholder="NGO ID"
                value={ngoID}
                onChange={(e) => {
                  setngoID(e.target.value);
                }}
                required
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
