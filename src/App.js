import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import { getEvents } from './api';
import EventForm from './components/EventForm';

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
    <div>
      <h1>Event Management</h1>
      {<EventList events={events} />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Event'}
      </button>
      {showForm && <EventForm setEvents={setEvents} />}
    </div>
  );
};

export default App;
