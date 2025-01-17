import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import { delEvent } from '../api';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }

  const handleDelete = (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      delEvent(eventId);
    }
  };

  return (
    <div>
      <h2>Event List</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>Start Time: {event.startTime}</p>
          <p>End Time: {event.endTime}</p>
          <QRCodeCanvas value={event.accessCode} />
          <button onClick={() => handleDelete(event.id)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
            Delete Event
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
