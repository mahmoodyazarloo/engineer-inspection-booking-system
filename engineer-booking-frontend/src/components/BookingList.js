import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../services/api';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';

const BookingList = ({engineers}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookings();
        console.log('API Response BookingList:', response.data.$values); // Debug API response
        setBookings(response.data.$values || []); // Ensure it's an array
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please try again later.');
        setBookings([]); // Fallback to an empty array
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Booking List
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : bookings.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Engineer ID</TableCell>
                <TableCell align="center">Engineer Name</TableCell>

              </TableRow>
            </TableHead>
              <TableBody>
                {bookings.map((booking) => {
                  const engineer = engineers?.find((item) => item.id === booking.engineerId); // Use 'find' to get the correct engineer
                  return (
                    <TableRow key={booking.id}>
                      <TableCell align="center">{new Date(booking.date).toISOString().slice(0, 10)}</TableCell>
                      <TableCell align="center">{booking.startTime}</TableCell>
                      <TableCell align="center">{booking.endTime}</TableCell>
                      <TableCell align="center">{booking.engineerId}</TableCell>
                      <TableCell align="center">{engineer ? engineer.name : 'N/A'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">No bookings available.</Alert>
      )}
    </Box>
  );
};

export default BookingList;
