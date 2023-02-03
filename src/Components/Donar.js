import React, { useState, useEffect, Profiler, useId } from "react";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";

export default function Donar() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;

  const [medicineName, setmedicineName] = useState("");
  const [tabletCount, settabletCount] = useState();
  const [expiryDate, setexpiryDate] = useState("");
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

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(profilePicture);
    const blob = await response.blob();

    try {
      storage
        .ref(`/pictures/${currentUserId}/${medicineName}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("pictures")
            .child(currentUserId)
            .child(medicineName)
            .getDownloadURL()
            .then((url) => {
              addmedicine(
                medicineName,
                tabletCount,
                expiryDate,
                medicineDesc,
                url
              );
              setmedicineName("");
              settabletCount("");
              setexpiryDate("");
              setmedicineDesc("");
            });
        });
    } catch {
      console.log("Problem occured");
    }
  };

  let intiMedicine;
  if (localStorage.getItem("medicines") === null) {
    intiMedicine = [];
  } else {
    intiMedicine = JSON.parse(localStorage.getItem("medicines"));
  }

  const [medicines, setMedicines] = useState(intiMedicine);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const [userId, setUserId] = useState("");

  let selectedngo = document?.getElementById("ngo-selected")?.value;

  useEffect(() => {
    const fetchUserId = async () => {
      const usersRef = database.ref("ngos");
      usersRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.Name === selectedngo) {
            setUserId(childSnapshot.key);
          }
        });
      });
    };
    fetchUserId();
  }, []);

  const submitMedicines = () => {
    if (userId !== "" && medicines.length !== 0) {
      database.ref("ngos/" + currentUserId).update({ medicines: medicines });
      medicines = [];
    }
  };

  const addmedicine = (name, count, date, desc, picture) => {
    let sno =
      medicines.length === 0 ? 0 : medicines[medicines.length - 1].sno + 1;
    const mymedicine = {
      sno: sno,
      name: name,
      count: count,
      date: date,
      desc: desc,
      picture: picture,
    };
    setMedicines([...medicines, mymedicine]);
  };

  const onDelete = (medicine) => {
    // Deleting this way in react does not work
    // let index = medicines.indexOf(medicine);
    // medicines.splice(index, 1);

    setMedicines(
      medicines.filter((e) => {
        return e !== medicine;
      })
    );
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
      <h2>Donate Medicine</h2>
        <h3 className="text-decoration-underline my-3">Add a Medicine</h3>
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
            <label htmlFor="expiryDate" className="form-label">
              Expiry Date
            </label>
            <input
              type="date"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              placeholder="Expiry Date"
              onChange={(e) => setexpiryDate(e.target.value)}
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
          <button type="submit" className="btn btn-sm btn-success">
            Submit
          </button>
        </form>
      </div>

      <div className="container">
        <h3 className="text-decoration-underline my-3">medicines List</h3>
        {medicines.length === 0 ? (
          <h4>No Medicines here yet</h4>
        ) : (
          medicines.map((medicine) => {
            return (
              <div>
                <h4 id={medicine.sno}>{medicine.name}</h4>
                <p>{medicine.count}</p>
                <p>{medicine.date}</p>
                <p>{medicine.desc}</p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    onDelete(medicine);
                  }}
                >
                  Delete
                </button>
                <hr />
              </div>
            );
          })
        )}

        <div>Select a NGO to donate medicine</div>
        <select className="p-2 mt-2 mb-3 mr-2" id="ngo-selected">
          {ngonames.map((x, y) => (
            <option value={x} key={y}>
              {x}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn m-4 btn-success"
          onClick={() => {
            submitMedicines();
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
