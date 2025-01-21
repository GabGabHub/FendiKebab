import React, { useState } from 'react';
import { signIN } from '../api'
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
const SigninPage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    const loginDetail = {
        name,
        password
    }

    // try {
    //       await signIN(loginDetail);
    //       alert('Signed in successfully!');
    //       navigate('/auth');
    //     } catch (error) {
    //       alert('There was an error signing in:', error);
    //     }
        signIN(loginDetail).then(response => {
          alert("Signed in successfully!");
          navigate('/auth');
        })
        .catch(error => {
          console.error("There was an error signing in: ", error);
        });
    }
    

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
            type="text"
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
    </div>
  );
};

export default SigninPage;