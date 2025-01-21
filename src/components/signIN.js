import React, { useState } from 'react';
import { signIN } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SignIn.css';

const SigninPage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    const loginDetail = {
      name,
      password,
    };

    signIN(loginDetail)
      .then((response) => {
        toast.success('Signed in successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/auth');
      })
      .catch((error) => {
        console.error('There was an error signing in:', error);
        toast.error('Failed to sign in. Please check your credentials.', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create an account</h1>
      <form onSubmit={handleSignin}>
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
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: 'blue',
            color: 'white',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SigninPage;
