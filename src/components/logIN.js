import React, { useState } from 'react';
// import axios from 'axios';
import { logIN } from '../api'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginDetail = {
        name,
        password
    }

    try {
      await logIN(loginDetail);
      alert('Logged in successfully!');
      navigate('/adminPage');
    } catch (error) {
      alert('There was an error logging in:', error);
    }
    }

    const SignIn = () => {

      return (
        <button
          style={{
            width: '150px',
            margin: '5px',
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/signin')}
        >
          Sign In
        </button>
      );
    };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
      <SignIn/>
    </div>
  );
};

export default LoginPage;