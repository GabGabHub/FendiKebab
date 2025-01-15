import React, { useState } from "react";
import axios from "axios";

const EventForm = ({ setEvents }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create event object
    const eventData = {
      name: eventName,
      startTime: startTime,
      endTime: endTime,
    };

    // Post event to backend
    axios.post("http://localhost:5000/api/events", eventData)
      .then(response => {
        setEvents(prevEvents => [...prevEvents, response.data]);  // Add new event to list
        alert("Event created successfully!");
      })
      .catch(error => {
        console.error("There was an error creating the event!", error);
      });
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
