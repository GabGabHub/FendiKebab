import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fendikebab.onrender.com',
});

export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);
export const delEvent = (eventID) => api.delete(`/events/${eventID}`);
export const getEventById = (eoID) => api.get(`/events/${eoID}`);
export const getAttendance = (eventId) => api.get(`/attendance/${eventId}`);
export const postAttendance = (data) => api.post('/attendance', data);
export const signIN = (accDetails) => api.post('/auth/signin', accDetails);
export const logIN = (accDetail) => api.post('/auth/login', accDetail);

export default api;
