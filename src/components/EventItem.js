import React from "react";
import QRCode from "qrcode.react";
import { useNavigate } from 'react-router-dom';
import '../styles/EventItem.css';

const EventItem = ({ event }) => {
  const currentTime = new Date();
  const eventStartTime = new Date(event.startTime);
  const eventEndTime = new Date(event.endTime);

  const isOpen = currentTime >= eventStartTime && currentTime <= eventEndTime;

  const formattedStartTime = eventStartTime.toLocaleString();
  const formattedEndTime = eventEndTime.toLocaleString();
 
    const navigate = useNavigate();

    const handleQRCodeScan = () => {
        navigate(`/checkin/${event.accessCode}`);
    };

  return (
    <div className="event-item">
      <h3>{event.name}</h3>
      <p>Start Time: {formattedStartTime}</p>
      <p>End Time: {formattedEndTime}</p>
      <p>Status: {isOpen ? "OPEN" : "CLOSED"}</p>
      <QRCode value={event.accessCode} onClick={handleQRCodeScan} />
      <button onClick={handleQRCodeScan}>Check-in</button>
      
      <button>Check-in</button>
    </div>
  );
};

export default EventItem;
