import React from "react";
import QRCode from "qrcode.react"; // If you're showing QR code

const EventItem = ({ event }) => {
  return (
    <div className="event-item">
      <h3>{event.name}</h3>
      <p>Start Time: {event.startTime}</p>
      <p>End Time: {event.endTime}</p>
      <p>Status: {event.isOpen ? "OPEN" : "CLOSED"}</p>
      <QRCode value={event.accessCode} />
      {/* If you want to add check-in button */}
      <button>Check-in</button>
    </div>
  );
};

export default EventItem;
