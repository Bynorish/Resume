import React, { useState } from 'react';
import './Landing.css';
import firebase from '../firebase';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Login clicked");
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
      console.log("User logged in");
      nav("/user");
    } catch (error) {
      alert("Invalid login credentials.");
    }
  };

  const handleRegister = async (event) => {
    console.log("Register clicked");
    event.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(username, password);
      console.log("User registered");
      alert("Registration successful. Please log in.");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleAboutUs = (event) => {
    console.log("About us clicked");
    event.preventDefault();
    nav("/about-us");
  };



  return (
    <div className="login-screen">
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleAboutUs}>About Us</button>
      </form>
    </div>
  );
}


export default Landing;