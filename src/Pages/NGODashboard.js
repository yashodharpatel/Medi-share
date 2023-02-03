import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";
import DashboardNav from "../Components/DashboardNav";

export default function NGODashboard() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const ngo = database.ref("ngos/" + currentUserId);
    ngo.once("value", (snapshot) => {
      const info = snapshot.val();
      setMedicines(info.medicines);
    });
  }, []);

  return (
    <>
    <DashboardNav/>
    <h3 className="centre">NGO Dashboard</h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr no</th>
          <th>Medicine Name</th>
          <th>Availablity</th>
          <th>Expiry Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {medicines
          ? medicines.map((medicine) => (
              <tr>
                <td>{medicine.sno + 1}</td>
                <td>{medicine.name}</td>
                <td>{medicine.count} Units</td>
                <td>{medicine.date}</td>
                <td>{medicine.desc}</td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
    </>
  );
}
