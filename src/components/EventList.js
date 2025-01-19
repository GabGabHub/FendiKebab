import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { delEvent } from '../api';
import '../App.css';
import ExportAttendance from './ExportAttendance';

const EventList = ({ events, setEvents }) => {
  const handleDelete = (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      delEvent(eventId)
        .then(() => {
          setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
          alert('Event deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
          alert('Failed to delete the event.');
        });
    }
  };

  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <div id="eventDist">
      <h2 id="eventList">Event List</h2>
      {events.map((event) => {
        const currentTime = new Date();
        const eventStartTime = new Date(event.startTime);
        const eventEndTime = new Date(event.endTime);
        const isOpen = currentTime >= eventStartTime && currentTime <= eventEndTime;

        return (
          <div id="eventItems" key={event.id}>
            <div id="qrDiv">
              <div id="eventText">
                <h3 id="eventName">{event.name}</h3>
                <p id="startTime">Start Time: {eventStartTime.toLocaleString()}</p>
                <p id="endTime">End Time: {eventEndTime.toLocaleString()}</p>
                <p>Status: {isOpen ? 'OPEN' : 'CLOSED'}</p>
              </div>
              <QRCodeCanvas id="qrCode" value={`http://localhost:3000/Form/${event.accessCode}`} />
           
            </div>
            <ExportAttendance event={event} />
            <button
              onClick={() => handleDelete(event.id)}
              style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', width: '100px' }}
            >
              Delete Event
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
