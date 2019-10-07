import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import NewGarment from '../components/NewGarment';

export default function(props) {
  return (
    <Paper>
      <Typography variant="h3">Add new garment</Typography>
      <NewGarment />
    </Paper>
  );
}
