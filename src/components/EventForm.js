import React, { useState } from "react";
import { createEvent } from "../api";
import { v4 as uuidv4 } from "uuid";

const EventForm = ({ setEvents }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name: eventName,
      startTime, 
      endTime,   
      accessCode: uuidv4().slice(0, 8).toUpperCase(),
    };

    createEvent(eventData)
      .then((response) => {

        const createdEvent = response.data;

        const newEvent = {
          ...createdEvent,
          startTime: new Date(createdEvent.startTime).toLocaleString(),
          endTime: new Date(createdEvent.endTime).toLocaleString(),
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
        alert("Event created successfully!");
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("There was an error creating the event.");
      });

    setEventName("");
    setStartTime("");
    setEndTime("");
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
          required
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
