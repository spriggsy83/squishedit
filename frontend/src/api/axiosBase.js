import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

api.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, {
    arrayFormat: 'indices',
    skipNulls: true,
  });
};

export default api;
