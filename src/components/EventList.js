import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <div>
      <h2>Event List</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>Start Time: {event.startTime}</p>
          <p>End Time: {event.endTime}</p>
          <QRCodeCanvas value={event.accessCode} /> {/* Display QRCodeCanvas */}
        </div>
      ))}
    </div>
  );
};

export default EventList;
