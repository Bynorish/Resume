import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import AboutUs from './components/AboutUs';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Landing/>} />
      <Route path="/about-us" exact element={<AboutUs/>} />
    </Routes>
  );
}

export default App;