// FormPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormPage = () => {
  const { accessCode } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/attendance', {
            name,
            email,
            accessCode,
        });
        
        if (response.status === 201) {
            setMessage('Your information has been saved successfully!');
        } else {
            setMessage('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error saving participant:', error.response ? error.response.data : error);
        setMessage('An error occurred while saving your information.');
    }
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
    </div>
  );
};

export default FormPage;
