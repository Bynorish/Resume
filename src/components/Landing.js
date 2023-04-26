import React, { useState } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

function Landing() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Login clicked");
    try {
      const userCredential = await auth.signInWithEmailAndPassword(username, password);
      console.log("User logged in");
  
      const authToken = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", authToken);
  
      nav("/user");
    } catch (error) {
      alert("Invalid login credentials.");
    }
  };

  const handleRegister = async (event) => {
    console.log("Register clicked");
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(username, password);
      console.log("User registered");
      await addUser(user.uid);
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

  const addUser = async (uid) => {
    try {
      const resumeItems = [];
      for (let i = 1; i <= 3; i++) {
        resumeItems.push({
          id: `item${i}`,
          name: `Resume ${i}`,
          firstName: `First Name ${i}`,
          lastName: `Last Name ${i}`,
          personalInfo: `Personal Info ${i}`,
          contactInfo: `Contact Info ${i}`,
          education: `Education ${i}`,
          experience: `Experience ${i}`,
          extraInfo: `ExtraInfo ${i}`,
        });
      }
  
      await setDoc(doc(collection(db, 'users'), uid), {
        resumeItems,
        selectedItem: 'item1',
      });
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
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