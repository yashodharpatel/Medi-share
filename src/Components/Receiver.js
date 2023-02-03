import React, { useState, useEffect } from "react";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";

export default function Receiver() {
    const { currentUser } = useAuth();
    const currentUserId = currentUser.uid;
    const currentUserEmail = currentUser.email;

  const [medicineName, setmedicineName] = useState("");
  const [tabletCount, settabletCount] = useState();
  const [medicineDesc, setmedicineDesc] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [ngo, setngo] = useState([]);
  const [ngonames, setngonames] = useState([]);

  useEffect(() => {
    const ngo = database.ref("ngos");
    ngo.once("value", (snapshot) => {
      const info = snapshot.val();
      setngo(info);
    });
  }, []);

  if (ngonames.length == 0) {
    Object.keys(ngo).forEach(function (key) {
      ngonames.push(ngo[key].Name);
    });
  }

//   const [filteredNgos, setfilteredNgos] = useState([]);

const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(profilePicture);
    const blob = await response.blob();

    try {
      storage
        .ref(`/precrecptions/${currentUserId}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("precrecptions")
            .child(currentUserId)
            .getDownloadURL()
            .then((url) => {
              setmedicineName("");
              settabletCount("");
              setmedicineDesc("");
              setProfilePicture("");
            });
        });
    } catch {
      console.log("Problem occured");
    }
  };

  const imagePreview = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };


  return (
    <>
      <div className="container">
        <h3 className="text-decoration-underline my-3">
          Order for medicine
        </h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="medicineName" className="form-label">
              Medicine Name
            </label>
            <input
              type="text"
              className="form-control"
              id="medicineName"
              value={medicineName}
              placeholder="Medicine Name"
              onChange={(e) => setmedicineName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tabletCount" className="form-label">
              Tablet Count
            </label>
            <input
              type="number"
              className="form-control"
              id="tabletCount"
              value={tabletCount}
              placeholder="Tablet Count"
              onChange={(e) => settabletCount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="medicineDesc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="medicineDesc"
              value={medicineDesc}
              placeholder="Description"
              onChange={(e) => setmedicineDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label className="form-label">Select a NGO to donate medicine</label>
        <select className="form-control" id="ngo-selected">
          {ngonames.map((x, y) => (
            <option value={x} key={y}>
              {x}
            </option>
          ))}
        </select>

          </div>
          
          <div className="mb-3">
            <label htmlFor="profile-picture" className="form-label">
              Upload Image of medicine script
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="profile-picture"
              onChange={imagePreview}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
