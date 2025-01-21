import React, { useState } from "react";
import { createEvent } from "../api";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/EventForm.css';

const EventForm = ({ setEvents }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name: eventName,
      startTime,
      endTime,
      accessCode: uuidv4().slice(0, 8).toUpperCase(),
      eoId: user.id ? user.id : null,
    };

    createEvent(eventData)
      .then((response) => {
        const createdEvent = response.data;
        const newEvent = {
          ...createdEvent.dataValues,
          startTime: new Date(createdEvent.dataValues.startTime).toLocaleString(),
          endTime: new Date(createdEvent.dataValues.endTime).toLocaleString(),
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
        toast.success("Event created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        toast.error("There was an error creating the event.", {
          position: "top-right",
          autoClose: 3000,
        });
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
