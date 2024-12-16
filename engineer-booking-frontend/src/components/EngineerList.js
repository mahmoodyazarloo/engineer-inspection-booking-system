import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEngineers } from '../services/api';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

const EngineerList = ({ count }) => {
  const [engineers, setEngineers] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchEngineers();
        setEngineers(response.data.$values || []); // Ensure it's an array
        console.log('Eng API Response:', response.data.$values); // Debug the response
      } catch (error) {
        console.error('Error fetching engineers:', error);
        setError('Failed to fetch engineers. Please try again later.');
        setEngineers([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [count]);

  return (
    <Box sx={{ maxWidth: 1000, margin: '20px auto', padding: 3 }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Engineer List
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : engineers.length > 0 ? (
        <Grid container spacing={3}>
          {engineers.map((engineer) => (
            <Grid item xs={12} sm={6} md={4} key={engineer.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {engineer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {engineer.email || 'N/A'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/engineer/${engineer.id}`}
                    size="small"
                    color="primary"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">No engineers available.</Alert>
      )}
    </Box>
  );
};

export default EngineerList;
