import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice';
import { logIN } from '../api'
import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';
const LoginPage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginDetail = {
        name,
        password
    }

    try {
      const response = await logIN(loginDetail);
      alert('Logged in successfully!');
      
      const {id, name} = response.data.user;
      dispatch(setUser({ id, name }));

      navigate('/adminPage');
    } catch (error) {
      alert('There was an error logging in:', error);
    }
    }

    const SignIn = () => {
      const navigate = useNavigate();
      return (
        <button
          style={{ width: '100px', margin: '5px' }}
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