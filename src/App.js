import React, { useState, useEffect } from 'react';
// import axios from 'axios';
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
  }, []);

  return (
    <div>
      <h1>Event Management</h1>
      {<EventList events={events} />}
      <h1>Events</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Event'}
      </button>
      {showForm && <EventForm setEvents={setEvents} />}
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
