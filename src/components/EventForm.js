import React, { useState } from "react";
// import axios from "axios";
import {createEvent} from "../api"

const EventForm = ({ setEvents }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name: eventName,
      startTime: startTime,
      endTime: endTime,
      accessCode: accessCode,
    };

    createEvent(eventData)
      .then(response => {
        setEvents(prevEvents => [...prevEvents, response.data]);
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
        <input
          type="text"
          placeholder="Access code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
