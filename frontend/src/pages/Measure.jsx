import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { UnderConstruction } from '../util/renderHelpers';

export default function(props) {
  return (
    <Paper>
      <Typography variant="h3">Measure</Typography>
      <UnderConstruction />
    </Paper>
  );
}
