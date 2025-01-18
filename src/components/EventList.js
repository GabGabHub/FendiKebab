import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import { delEvent } from '../api';
import '../App.css'
import ExportAttendance from './ExportAttendance';

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
    <div id="eventDist">
      <h2 id='eventList'>Event List</h2>
      {events.map((event) => (
        <div id="eventItems" key={event.id}>
          <div id="qrDiv">
            <div id="eventText">
              <h3 id='eventName'>{event.name}</h3>
              <p id='startTime'>Start Time: {event.startTime}</p>
              <p id='endTime'>End Time: {event.endTime}</p>
            </div>
            <QRCodeCanvas id='qrCode' value={event.accessCode} />
          </div>
          <ExportAttendance event={event}></ExportAttendance>
          <button onClick={() => handleDelete(event.id)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' ,width:'100px',}}>
            Delete Event
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
