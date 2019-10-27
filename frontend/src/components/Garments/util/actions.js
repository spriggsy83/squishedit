'use-strict';
import { garments as api } from '../../../api';
import * as OPTS from '../../../common/GARMENT-OPTS';

const dispatches = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERRORED: 'ERRORED',
  FILTER: 'FILTER',
};

const fetchGarments = (dispatch, measures, margin, filters) => {
  dispatch({
    type: dispatches.LOADING,
  });
  api
    .list(null, filtersToArray(filters), measuresToArray(measures), margin)
    .then((result) => {
      dispatch({
        type: dispatches.LOADED,
        payload: {
          data: addFits(result.data, measures, margin),
          meta: result.meta,
        },
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

const measuresToArray = (measuresObj) => {
  let measuresArr = [];
  for (let [key, value] of Object.entries(measuresObj)) {
    measuresArr.push({ point: key, value: value });
  }
  return measuresArr;
};

const doesFit = (min, max, measure, margin) => {
  if (min && max && measure) {
    if (measure >= min && measure <= max) {
      return 'Y';
    } else if (measure >= min - margin && measure <= max + margin) {
      return 'M';
    } else {
      return 'N';
    }
  }
  return null;
};

const addFits = (data, measures, margin) => {
  let newData = [];
  data.forEach((row) => {
    let fits = {};
    OPTS.MPOINTS.forEach((mpoint) => {
      const pointMeasure = measures[mpoint];
      const min = row[mpoint + 'Min'];
      const max = row[mpoint + 'Max'];
      fits[mpoint + 'Fit'] = doesFit(min, max, pointMeasure, margin);
    });
    newData.push({ ...row, ...fits });
  });
  return newData;
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
