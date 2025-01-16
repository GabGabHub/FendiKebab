import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './components/EventList';  // Adjust the path if necessary

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace with your actual backend endpoint
    axios.get('http://localhost:3000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []); // Empty dependency array, so it runs only once when the component mounts

  return (
    <div>
      <h1>Event Management</h1>
      <EventList events={events} />
    </div>
  );
};

export default App;
