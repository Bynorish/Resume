import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import AboutUs from './components/AboutUs';
import Admin from './components/Admin';
import User from './components/User';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Landing/>} />
      <Route path="/about-us" exact element={<AboutUs/>} />
      <Route path="/admin" exact element={<Admin/>} />
      <Route path="/user" element={<User/>} />
    </Routes>
  );
}

export default App;