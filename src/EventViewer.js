import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from 'react-router-dom';
import './styles/EventViewer.css';
const EventViewer = ({ events }) => {
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
                <p>Status: {isOpen ? "OPEN" : "CLOSED"}</p>
              </div>
              {isOpen && <QRCodeCanvas id="qrCode" value={event.accessCode} />}
            </div>
          </div>
        );
      })}
      <NavigateToMain></NavigateToMain>
    </div>
  );
};

const NavigateToMain = () => {
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
      onClick={() => navigate('/adminPage')}
    >
      Go back
    </button>
  );
};

export default EventViewer;
