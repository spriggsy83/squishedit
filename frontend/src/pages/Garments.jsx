import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Garments from '../components/Garments';

export default function(props) {
  return (
    <Paper>
      <Typography variant="h3">Garments</Typography>
      <Garments initMeasures={{ a: 21, c: 15, d: 22, f: 32 }} />
    </Paper>
  );
}
