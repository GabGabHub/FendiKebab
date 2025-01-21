import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { postAttendance } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceCheckin = ({ events }) => {
  const [codeInput, setCodeInput] = useState("");
  const [event, setEvent] = useState(null);

  const handleCodeInput = (e) => {
    setCodeInput(e.target.value);
  };

  const handleCheckIn = () => {
    const foundEvent = events.find((event) => event.accessCode === codeInput);
    if (foundEvent) {
      setEvent(foundEvent);
      postAttendance({
        eventId: foundEvent.id,
        timestamp: new Date().toISOString(),
        participantId: 1,
      })
        .then(() => {
          toast.success("Attendance recorded successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error("There was an error recording attendance!", error);
          toast.error("Failed to record attendance. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      toast.error("Invalid access code.", {
        position: "top-right",
        autoClose: 3000,
      });
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
