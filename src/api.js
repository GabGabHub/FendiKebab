import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Make sure to change the URL to your backend's URL
});

// You can create more methods for different API calls
export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);
export const getAttendance = (eventId) => api.get(`/attendance/${eventId}`);

export default api;
