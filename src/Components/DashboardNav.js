import React, { useState } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { Link, useHistory } from "react-router-dom";

export default function DashboardNav() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const uid = currentUser.uid;
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="nav header-nav" id="nav">
        <div className="set-width-1200">
          <div className="inside-nav header-insidenav">
            <div className="logo">
              <Link
                to="/dashboard/"
                className="remove-td"
                style={{ color: "#048dbb" }}
              >
                medi<span style={{ color: "rgb(93, 93, 93)" }}>share</span>
              </Link>
            </div>
            <div className="inside-nav">
              <button
                type="button"
                className="btn login-btn"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
