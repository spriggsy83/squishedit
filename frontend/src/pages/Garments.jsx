import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Garments from '../components/Garments';

export default function(props) {
  return (
    <Paper>
      <Typography variant="h3">Garments</Typography>
      <Garments initMeasures={{ a: 23.5, c: 35, e: 34, e1: 33 }} />
    </Paper>
  );
}
