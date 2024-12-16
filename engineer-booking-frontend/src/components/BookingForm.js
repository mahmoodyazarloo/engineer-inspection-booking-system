import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { createBooking } from '../services/api';

const BookingForm = ({ engineers = [], refreshBookings }) => {
  const [engineerId, setEngineerId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [inspectionType, setInspectionType] = useState('Small');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({ engineerId, date, startTime, endTime, inspectionType });
      alert('Booking created!');
      setEngineerId('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setInspectionType('Small');
      refreshBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h3" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Create Booking
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Engineer</InputLabel>
            <Select
              value={engineerId}
              onChange={(e) => setEngineerId(e.target.value)}
              label="Engineer"
            >
              <MenuItem value="">
                <em>Select Engineer</em>
              </MenuItem>
              {engineers.map((engineer) => (
                <MenuItem key={engineer.id} value={engineer.id}>
                  {engineer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Start Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="End Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Inspection Type</InputLabel>
            <Select
              value={inspectionType}
              onChange={(e) => setInspectionType(e.target.value)}
              label="Inspection Type"
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              paddingX: 5,
              paddingY: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Create Booking
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingForm;
