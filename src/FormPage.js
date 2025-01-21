import React, { useState } from 'react';
import { postAttendance } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/FormPage.css';

const FormPage = () => {
  const { accessCode } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      accessCode
    };
    postAttendance(formData)
      .then(response => {
        alert("Attendance recorded successfully!");
      })
      .catch(error => {
        console.error("There was an error recording attendance!", error);
      });
  };

  const NavigateToMain = () => {
    navigate('/');  // This will send you directly to the homepage (http://localhost:3000/)
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Event Registration</h1>
      <p>Access Code: {accessCode}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
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
        onClick={NavigateToMain}
      >
        Go back
      </button>
    </div>
  );
};

export default FormPage;
