import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { fetchGarments, updateFilter } from './util/actions';
import reducer from './util/reducer';
import FilterSelects from './Components/FilterSelects';
import GarmentsTable from './Components/GarmentsTable';

const INIT_STATE = {
  garments: [],
  measurements: {},
  margin: 0,
  filters: {},
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
  const { garments, measurements, margin, filters, hasLoaded, error } = state;

  useEffect(() => {
    fetchGarments(dispatch, measurements, margin, filters);
  }, [measurements, margin, filters]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return (
    <>
      <FilterSelects
        type={filters.type || 'any'}
        compressionLevel={filters.compressionLevel || 'any'}
        handleChange={(field, value) => {
          updateFilter(dispatch, field, value);
        }}
      />
      <GarmentsTable
        data={garments}
        fitMode={true}
        measurements={measurements}
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
