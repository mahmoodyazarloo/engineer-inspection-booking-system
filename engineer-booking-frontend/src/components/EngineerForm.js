import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { createEngineer } from '../services/api';

const EngineerForm = ({ addCount }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEngineer({ name, email });
      alert('Engineer added!');
      setName('');
      setEmail('');
      addCount(); // Trigger the parent action to refresh the engineer count
    } catch (error) {
      console.error('Error adding engineer:', error);
      alert('Failed to add engineer.');
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, margin: '20px auto', padding: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography
          variant="h5"
          component="h3"
          sx={{ textAlign: 'center', marginBottom: 3 }}
        >
          Add Engineer
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              Add Engineer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EngineerForm;
