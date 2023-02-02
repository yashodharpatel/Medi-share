import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Donar() {
  const [medicineName, setmedicineName] = useState("");
  const [tabletCount, settabletCount] = useState();
  const [expiryDate, setexpiryDate] = useState("");
  const [medicineDesc, setmedicineDesc] = useState("");

  const submit = (e) => {
        e.preventDefault();
        
        addmedicine(medicineName, tabletCount, expiryDate, medicineDesc);
        setmedicineName("");
        settabletCount("");
        setexpiryDate("");
        setmedicineDesc("");
    
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

  const addmedicine = (name, count, date, desc) => {
    let sno = medicines.length === 0 ? 0 : medicines[medicines.length - 1].sno + 1;
    const mymedicine = {
      sno: sno,
      name: name,
      count: count,
      date: date,
      desc: desc
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

  return (
    <>
      <div>Donate Medicine</div>

      <div className="container">
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
      </div>
    </>
  );
}
