import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const AttendanceCheckin = ({ events }) => {
  const [codeInput, setCodeInput] = useState("");
  const [event, setEvent] = useState(null);

  const handleCodeInput = (e) => {
    setCodeInput(e.target.value);
  };

  const handleCheckIn = () => {
    const foundEvent = events.find(event => event.accessCode === codeInput);
    if (foundEvent) {
      setEvent(foundEvent);
      axios.post("http://localhost:3000/attendance", {
        eventId: foundEvent.id,
        timestamp: new Date().toISOString(),
        participantId: 1,
      })
      .then(response => {
        alert("Attendance recorded successfully!");
      })
      .catch(error => {
        console.error("There was an error recording attendance!", error);
      });
    } else {
      alert("Invalid access code.");
    }
  };

  return (
    <div>
      <h2>Check-in</h2>
      <div>
        <input
          type="text"
          placeholder="Enter access code"
          value={codeInput}
          onChange={handleCodeInput}
        />
        <button onClick={handleCheckIn}>Check-in</button>
      </div>
      {event && <QRCodeCanvas value={event.accessCode} />}
    </div>
  );
};

export default AttendanceCheckin;
