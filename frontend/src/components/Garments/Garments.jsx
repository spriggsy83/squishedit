import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Switch, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchGarments, updateFilter } from './util/actions';
import reducer from './util/reducer';
import FilterSelects from './Components/FilterSelects';
import GarmentsTable from './Components/GarmentsTable';

const INIT_STATE = {
  garments: [],
  measures: {},
  margin: 0,
  filters: {},
  hasLoaded: false,
  isLoading: false,
  error: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));

const Garments = (props) => {
  const classes = useStyles();
  const { onClick, onError, initMeasures } = props;
  const [state, dispatch] = useReducer(reducer, {
    ...INIT_STATE,
    ...(props.initMeasures && { measures: initMeasures }),
  });
  const { garments, measures, margin, filters, error } = state;
  const [fitMode, setMode] = useState(props.initMeasures ? true : false);
  /*const [filtersOpen, setFiltersOpen] = useState(false);*/

  useEffect(() => {
    fetchGarments(dispatch, measures, margin, filters);
  }, [measures, margin, filters]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return (
    <>
      <div className={classes.root}>
        <FilterSelects
          type={filters.type || 'any'}
          compressionLevel={filters.compressionLevel || 'any'}
          handleChange={(field, value) => {
            updateFilter(dispatch, field, value);
          }}
        />
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Details</Grid>
            <Grid item>
              <Switch
                checked={fitMode}
                onChange={(e) => setMode(e.target.checked)}
              />
            </Grid>
            <Grid item>Sizes</Grid>
          </Grid>
        </Typography>
      </div>
      <GarmentsTable
        data={garments}
        fitMode={fitMode}
        measures={measures}
        onClick={onClick}
      />
    </>
  );
};

Garments.propTypes = {
  // Seed search with an initial value
  initMeasures: PropTypes.object,
  // onClick = (aPlace) =>
  onClick: PropTypes.func,
  // onError = (error) =>
  onError: PropTypes.func,
};

export default Garments;
