import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);
export const getAttendance = (eventId) => api.get(`/attendance/${eventId}`);

export default api;
