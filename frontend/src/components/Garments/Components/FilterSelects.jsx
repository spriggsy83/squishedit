import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as OPTS from '../../../common/GARMENT-OPTS';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    width: '25%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const FilterSelects = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant={'h5'}>Filters:</Typography>
      <TextField
        className={classes.field}
        variant="outlined"
        label="Type"
        name="type"
        onChange={(event) => {
          props.handleChange(event.target.name, event.target.value);
        }}
        value={props.type}
        margin="normal"
        select
      >
        <MenuItem key={'gtype-any'} value={'any'}>
          any
        </MenuItem>
        {OPTS.TYPES.map((opt, index) => {
          return (
            <MenuItem key={'gtype' + index} value={opt}>
              {opt}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        className={classes.field}
        variant="outlined"
        label="Compression Level"
        name="compressionLevel"
        onChange={(event) => {
          props.handleChange(event.target.name, event.target.value);
        }}
        value={props.compressionLevel}
        margin="normal"
        select
      >
        <MenuItem key={'gtype-any'} value={'any'}>
          any
        </MenuItem>
        {OPTS.COMPRESSCLASS.map((opt, index) => {
          return (
            <MenuItem key={'cclass' + index} value={opt}>
              {opt}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
};

FilterSelects.propTypes = {
  type: PropTypes.string.isRequired,
  compressionLevel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FilterSelects;
