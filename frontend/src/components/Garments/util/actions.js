'use-strict';
import { garments as api } from '../../../api';

const dispatches = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERRORED: 'ERRORED',
  FILTER: 'FILTER',
};

const fetchGarments = (dispatch, measurements, margin, filters) => {
  dispatch({
    type: dispatches.LOADING,
  });
  api
    .list(null, filtersToArray(filters), measurements, margin)
    .then((result) => {
      dispatch({
        type: dispatches.LOADED,
        payload: result,
      });
    })
    .catch((e) => {
      dispatch({
        type: dispatches.ERRORED,
        payload: {
          error: e,
        },
      });
    });
};

const filtersToArray = (filtersObj) => {
  let filtersArr = [];
  for (let [key, value] of Object.entries(filtersObj)) {
    filtersArr.push({ field: key, value: value });
  }
  return filtersArr;
};

const updateFilter = (dispatch, field, value) => {
  dispatch({
    type: dispatches.FILTER,
    payload: {
      field: field,
      value: value,
    },
  });
};

export { fetchGarments, updateFilter, dispatches };
