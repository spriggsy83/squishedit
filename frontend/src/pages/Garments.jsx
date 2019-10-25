import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Garments from '../components/Garments';

export default function(props) {
  return (
    <Paper>
      <Typography variant="h3">Garments</Typography>
      <Garments />
    </Paper>
  );
}
