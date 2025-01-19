import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});



export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);
export const delEvent = (eventID) => api.delete(`/events/${eventID}`);
export const getAttendance = (eventId) => api.get(`/attendance/${eventId}`);
export const postAttendance = (data) => api.post('/attendance', data);

export default api;
