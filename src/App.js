import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import Landing from './components/Landing';
import AboutUs from './components/AboutUs';
import Admin from './components/Admin';
import User from './components/User';
import firebase from './firebase';
import Navbar from "./components/Navbar";
import React from 'react';

function App() {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/about-us" exact element={<AboutUs />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/user" element={user ? <User /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;