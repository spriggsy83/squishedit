import React from 'react';
//import NumberFormat from 'react-number-format';
import { LinearProgress, Typography } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';

export function UnderConstruction() {
  return (
    <>
      <Typography variant="h6" color="inherit" noWrap>
        Under Construction
      </Typography>
      <BuildIcon />
    </>
  );
}

/*export function renderNumber(value) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      style={{ float: 'right' }}
    />
  );
}*/

export function renderRightText(value) {
  return <Typography align={'right'}>{value}</Typography>;
}

export function renderLoadingBars() {
  return (
    <>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </>
  );
}
