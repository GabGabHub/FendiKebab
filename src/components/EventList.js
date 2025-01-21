import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { delEvent, getAttendance } from '../api';
import '../App.css';
import ExportAttendance from './ExportAttendance';
import '../styles/EventList.css';
import { toast } from 'react-toastify'; // Import the toast functionality
import 'react-toastify/dist/ReactToastify.css'; // Import the required styles

const EventList = ({ events, setEvents }) => {
  const [attendeesMap, setAttendeesMap] = useState({});
  
  useEffect(() => {
    const fetchAllAttendances = async () => {
      const newAttendeesMap = {};
      for (const event of events) {
        try {
          const response = await getAttendance(event.id);
          newAttendeesMap[event.id] = response.data.map((att) => ({
            participantName: att.Participant.name,
            participantEmail: att.Participant.email,
            timestamp: att.timestamp,
          }));
        } catch (error) {
          console.error(`Error fetching attendance for event ${event.id}:`, error);
        }
      }
      setAttendeesMap(newAttendeesMap);
    };

    fetchAllAttendances();
    // eslint-disable-next-line
  }, [events, getAttendance]);

  const handleDelete = (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      delEvent(eventId)
        .then(() => {
          setEvents((events) => events.filter((event) => event.id !== eventId));
          toast.success('Event deleted successfully!'); // Display success toast
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
          toast.error('Failed to delete the event.'); // Display error toast
        });
    }
  };

  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <div id="eventDist">
      <h2 id="eventList">Event List</h2>
      {events.map((event) => {
        const currentTime = new Date();
        const eventStartTime = new Date(event.startTime);
        const eventEndTime = new Date(event.endTime);
        const isOpen = currentTime >= eventStartTime && currentTime <= eventEndTime;
        
        const attendees = attendeesMap[event.id] || [];

        return (
          <div id="eventItems" key={event.id}>
            <div id="qrDiv">
              <div id="eventText">
                <h3 id="eventName">{event.name}</h3>
                <p id="startTime">Start Time: {eventStartTime.toLocaleString()}</p>
                <p id="endTime">End Time: {eventEndTime.toLocaleString()}</p>
                <p>Status: {isOpen ? 'OPEN' : 'CLOSED'}</p>
              </div>
              <QRCodeCanvas id="qrCode" value={`http://localhost:3000/Form/${event.accessCode}`} />
              <ul>
                {attendees.map((participant, index) => (
                  <li key={participant.id}>
                    {participant.participantName} ({participant.participantEmail}) - {new Date(participant.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <ExportAttendance event={event} />
            <button
              onClick={() => handleDelete(event.id)}
              style={{ margin: '5px', backgroundColor: 'red', color: 'white', width: '100px' }}
            >
              Delete Event
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
