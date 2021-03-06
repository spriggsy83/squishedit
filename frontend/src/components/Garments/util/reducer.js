'use-strict';
import update from 'immutability-helper';
import { dispatches as acts } from './actions';

export default function(state, action) {
  const payload = action.payload || null;
  switch (action.type) {
    case acts.LOADING:
      return update(state, {
        isLoading: {
          $set: true,
        },
      });
    case acts.LOADED:
      return update(state, {
        isLoading: {
          $set: false,
        },
        hasLoaded: {
          $set: true,
        },
        garments: {
          $set: payload.data,
        },
      });
    case acts.ERRORED:
      return update(state, {
        isLoading: {
          $set: false,
        },
        error: {
          $set: payload.error,
        },
      });
    case acts.FILTER:
      if (payload.value === 'any') {
        return update(state, {
          filters: {
            $unset: [payload.field],
          },
        });
      }
      return update(state, {
        filters: {
          $merge: { [payload.field]: payload.value },
        },
      });
    default:
      return state;
  }
}
