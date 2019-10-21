'use-strict';
import { garments as api } from '../../../api';

const dispatches = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERRORED: 'ERRORED',
};

const fetchGarments = (dispatch, measurements, margin, filters) => {
  dispatch({
    type: dispatches.LOADING,
  });
  api
    .list(null, filters, measurements, margin)
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

export { fetchGarments, dispatches };
