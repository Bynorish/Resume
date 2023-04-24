import React from "react";
import firebase from "../firebase";
import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log("User signed out");
    });
  };

  return (
    <nav className="navbar">

      <div className="right-nav">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;