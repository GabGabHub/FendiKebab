import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import EventList from './components/EventList';
import EventViewer from './EventViewer'; 
import { getEvents } from './api';
import EventForm from './components/EventForm';
import './App.css';
import FormPage from './FormPage'; 

const App = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    getEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }); 

  const filteredEvents = events.filter((event) => {
    const name = event.name ? event.name.toLowerCase() : '';
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <Router>
      <div id="mainPage">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 id="eventManagement">Event Management</h1>

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
                  <EventList events={filteredEvents} setEvents={setEvents} />

                  <button
                    style={{ width: '100px', margin: '5px' }}
                    onClick={() => setShowForm(!showForm)}
                  >
                    {showForm ? 'Cancel' : 'Add Event'}
                  </button>

                  {showForm && <EventForm setEvents={setEvents} />}

                  <NavigateToViewer />
                </div>
              </>
            }
          />
          <Route path="/Form/:accessCode" element={<FormPage />} />
          <Route path="/eventviewer" element={<EventViewer events={events} />} />
        </Routes>
      </div>
    </Router>
  );
};

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
