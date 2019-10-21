import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { fetchGarments } from './util/actions';
import reducer from './util/reducer';
/*import SearchBox from './Components/SearchBox';
import GarmentsTable from './Components/GarmentsTable';*/

const INIT_STATE = {
  garments: [],
  measurements: [],
  margin: 0,
  filters: [],
  hasLoaded: false,
  isLoading: false,
  error: null,
};

const Garments = (props) => {
  const { onClick, onError, initMeasures } = props;
  const [state, dispatch] = useReducer(reducer, {
    ...INIT_STATE,
    ...(props.initMeasures && { measurements: props.initMeasures }),
  });
  const { garments, measurements, margin, filters, isLoading, error } = state;

  useEffect(() => {
    fetchGarments(dispatch, measurements, margin, filters);
  }, [measurements, margin, filters]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  /*const doUpdate = (value, field) => {
    updateQuery(dispatch, value, field);
  };*/

  return <>{JSON.stringify(garments, null, 1)}</>;
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
