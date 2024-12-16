import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import { addAvailability } from '../services/api';

const AvailabilityForm = ({ engineerId, refreshEngineer }) => {
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null); // Track form errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      // Ensure the payload matches the expected structure
      const payload = {
        day,         // e.g., "Monday"
        startTime,   // e.g., "09:00:00"
        endTime      // e.g., "10:00:00"
      };

      // Call the API with engineerId and the payload
      await addAvailability(engineerId, payload);

      // Notify the user and reset the form
      alert('Availability added!');
      setDay('Monday'); // Reset day to default
      setStartTime(''); // Clear start time
      setEndTime('');   // Clear end time

      // Refresh the engineer details
      refreshEngineer();
    } catch (error) {
      console.error('Error adding availability:', error);

      // Handle validation errors
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        console.log('Validation Errors:', validationErrors);
        setError('Failed to add availability. Please check your inputs.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
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
        Add Availability
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 3 }}>{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Day</InputLabel>
            <Select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              label="Day"
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
            </Select>
          </FormControl>
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
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Add Availability
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AvailabilityForm;
