import React, { useEffect, useState } from 'react';
import EngineerList from '../components/EngineerList';
import EngineerForm from '../components/EngineerForm';
import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';
import { fetchEngineers } from '../services/api';
import { Box, Grid, Typography, Paper, Divider } from '@mui/material';

const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [engineers, setEngineers] = useState([]); // Shared state for engineers

  // Fetch engineers whenever `count` changes (e.g., when a new engineer is added)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const engineersResponse = await fetchEngineers();
        setEngineers(engineersResponse.data?.$values || []);
      } catch (error) {
        console.error('Error fetching engineers:', error);
      }
    };

    fetchInitialData();
  }, [count]);

  const addCount = () => {
    setCount(count + 1);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '20px auto', padding: 3 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold' }}
      >
        Engineer Inspection Booking System
      </Typography>
      <Grid container spacing={4}>
        {/* Engineers Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Engineers
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <EngineerList count={count} />
            <Divider sx={{ marginY: 2 }} />
            <EngineerForm addCount={addCount} />
          </Paper>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              Bookings
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <BookingList engineers={engineers} />
            <Divider sx={{ marginY: 2 }} />
            <BookingForm engineers={engineers} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
