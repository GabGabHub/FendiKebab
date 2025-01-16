import React from "react";
import QRCode from "qrcode.react";

const EventItem = ({ event }) => {
  return (
    <div className="event-item">
      <h3>{event.name}</h3>
      <p>Start Time: {event.startTime}</p>
      <p>End Time: {event.endTime}</p>
      <p>Status: {event.isOpen ? "OPEN" : "CLOSED"}</p>
      <QRCode value={event.accessCode} />
      
      <button>Check-in</button>
    </div>
  );
};

export default EventItem;
