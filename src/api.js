import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);
export const getAttendance = (eventId) => api.get(`/attendance/${eventId}`);
export const postAttendance = (foundEvent) => {
  const attendanceData = {
    eventId: foundEvent.id,
    timestamp: new Date().toISOString(),
    participantId: 1,
  };
  
  return api.post('/attendance', attendanceData);
};

export default api;
