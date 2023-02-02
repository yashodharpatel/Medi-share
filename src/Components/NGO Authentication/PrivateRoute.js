import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";
import { database } from "../../firebase";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  const [state, setState] = useState("loading");

  const user = database
    .ref("users")
    .once("value")
    .then((snapshot) => {
      return snapshot.hasChild(uid);
    });

  useEffect(() => {
    (async function () {
      try {
        const isUserExist = await user;
        setState(isUserExist ? "userExists" : "redirect");
      } catch {
        setState("redirect");
      }
    })();
  }, []);

  if (state === "loading") {
    return (
      <div className="loading-spinner">
        {/* <div className="loading-text">Loading...</div> */}
        <div className="logo">
          <div style={{ color: "#048dbb", fontSize: "36px" }}>
            coding<span style={{ color: "rgb(93, 93, 93)" }}>peer</span>
          </div>
        </div>
        <div className="spinner-grow spinner" role="status" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        state === "userExists" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/create-account" />
        )
      }
    ></Route>
  );
}