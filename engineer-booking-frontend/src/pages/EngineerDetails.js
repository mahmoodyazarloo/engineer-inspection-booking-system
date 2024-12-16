import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEngineerById } from '../services/api';
import AvailabilityForm from '../components/AvailabilityForm';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';

const EngineerDetails = () => {
  const { id } = useParams();
  const [engineer, setEngineer] = useState({
    name: '',
    email: '',
    availabilities: [], // Initialize with empty array
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchEngineerById(id);
        const fetchedEngineer = response.data;
        // Ensure availabilities is always an array
        fetchedEngineer.availabilities = Array.isArray(fetchedEngineer.availabilities)
          ? fetchedEngineer.availabilities
          : [];
        setEngineer(fetchedEngineer);
      } catch (err) {
        console.error('Error fetching engineer:', err);
        setError('Failed to fetch engineer details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          {engineer.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Email:</strong> {engineer.email}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
          Availabilities
        </Typography>
        {Array.isArray(engineer.availabilities) && engineer.availabilities.length > 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Day</TableCell>
                  <TableCell align="center">Start Time</TableCell>
                  <TableCell align="center">End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engineer.availabilities.map((availability) => (
                  <TableRow key={availability.id}>
                    <TableCell align="center">{availability.day}</TableCell>
                    <TableCell align="center">{availability.startTime}</TableCell>
                    <TableCell align="center">{availability.endTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No availabilities available.</Alert>
        )}
      </Paper>
      <AvailabilityForm
        engineerId={id}
        refreshEngineer={() => {
          fetchEngineerById(id).then((res) => setEngineer(res.data));
        }}
      />
    </Box>
  );
};

export default EngineerDetails;
