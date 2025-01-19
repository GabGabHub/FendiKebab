import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Import necessary Router components
import EventList from './components/EventList';
import EventViewer from './EventViewer'; // Import EventViewer component
import { getEvents } from './api';
import EventForm from './components/EventForm';
import './App.css';
import FormPage from './FormPage';  // Import the FormPage component

const App = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  useEffect(() => {
    getEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }); 

  // Filter events based on search term
  const filteredEvents = events.filter((event) => {
    const name = event.name ? event.name.toLowerCase() : ''; // Safely handle undefined or null event.name
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <Router>
      <div id="mainPage">
        <Routes>
          {/* Main Event Management Route */}
          <Route
            path="/"
            element={
              <>
                <h1 id="eventManagement">Event Management</h1>

                {/* Search Bar */}
                <div id="searchDiv">
                  <input
                    type="text"
                    id="searchInput"
                    placeholder="Search by event name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div id="addBtn">
                  {/* Passing filtered events to the EventList component */}
                  <EventList events={filteredEvents} setEvents={setEvents} />

                  {/* Button to toggle event form */}
                  <button
                    style={{ width: '100px', margin: '5px' }}
                    onClick={() => setShowForm(!showForm)}
                  >
                    {showForm ? 'Cancel' : 'Add Event'}
                  </button>

                  {/* Show form to add event */}
                  {showForm && <EventForm setEvents={setEvents} />}

                  {/* Button to navigate to EventViewer */}
                  <NavigateToViewer />
                </div>
              </>
            }
          />
          <Route path="/Form/:accessCode" element={<FormPage />} />
          {/* Event Viewer Route */}
          <Route path="/eventviewer" element={<EventViewer events={events} />} />
        </Routes>
      </div>
    </Router>
  );
};

// Navigation Button Component
const NavigateToViewer = () => {
  const navigate = useNavigate();

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
      onClick={() => navigate('/eventviewer')}
    >
      Go to Event Viewer
    </button>
  );
};

export default App;
