import React from "react";
import axios from "axios";

const ExportAttendance = ({ events }) => {
  const handleExport = (eventId) => {
    axios
      .get(`http://localhost:3000/api/attendance/${eventId}`)
      .then((response) => {
        const data = response.data.map((att) => ({
          participantName: att.Participant.name,
          participantEmail: att.Participant.email,
          timestamp: att.timestamp,
        }));

        const csvContent = [
          "Participant Name,Participant Email,Timestamp",
          ...data.map((att) => `${att.participantName},${att.participantEmail},${att.timestamp}`)
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "attendance.csv";
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting attendance:", error);
      });
  };

  return (
    <div>
      <h2>Export Attendance</h2>
      <select onChange={(e) => handleExport(e.target.value)}>
        <option value="">Select an Event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExportAttendance;
