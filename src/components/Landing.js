import React, { useState } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login clicked");
    // TODO: implement login logic
  }

  const handleRegister = (event) => {
    console.log("Register clicked");
    event.preventDefault();
    registerUser(username, password);
  }

  const handleAboutUs = (event) => {
    console.log("About us clicked");
    event.preventDefault();
    nav("/about-us");
  }


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

const registerUser = async (username, password) => {
  try {
    const response = await fetch('API ROUTE!!!', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    console.log('User registered:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default Landing;