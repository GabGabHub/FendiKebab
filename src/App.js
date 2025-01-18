import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import { getEvents } from './api';
import EventForm from './components/EventForm';
import './App.css'

const App = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getEvents()
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  });

  return (
    <div id='mainPage'> 
      <h1 id='eventManagement'>Event Management</h1>
      <div id="addBtn">
        {<EventList events={events} />}
        <button style={{width:'100px',margin:'5px',}} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Event'}
        </button>
        {showForm && <EventForm setEvents={setEvents} />}
      </div>
    </div>
  );
};

export default App;
