import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5290/api', // Update with your backend URL
});

// Engineers
export const fetchEngineers = () => API.get('/engineers');
export const fetchEngineerById = (id) => API.get(`/engineers/${id}`);
export const createEngineer = (data) => API.post('/engineers/', data);
export const updateEngineer = (id, data) => API.put(`/engineers/${id}`, data);
export const deleteEngineer = (id) => API.delete(`/engineers/${id}`);

// Availabilities
export const addAvailability = (id, data) => API.post(`/engineers/${id}/availability`, data);

// Bookings
export const fetchBookings = () => API.get('/bookings');
export const createBooking = (data) => API.post('/bookings', data);
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
