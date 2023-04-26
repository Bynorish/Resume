import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import Landing from './components/Landing';
import AboutUs from './components/AboutUs';
//import Admin from './components/Admin';
import User from './components/User';
import { auth } from './firebase';
import React from 'react';

function App() {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/about-us" exact element={<AboutUs />} />
        {/*<Route path="/admin" exact element={<Admin />} />*/}
        <Route path="/user" element={user ? <User /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;