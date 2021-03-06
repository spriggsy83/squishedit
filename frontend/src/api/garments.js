import apiAxios from './axiosBase';

export const create = (garment) => {
  if (!garment) {
    return null;
  }
  return apiAxios
    .post(`garments/`, garment)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw new Error('Error while saving new garment');
    });
};

export const list = (order, filters, measurements, margin) => {
  let params = {
    paging: { limit: 'all' },
    order: order || { field: null },
    filter: filters || [],
    fit: { measurements: measurements || [], margin: margin || 0 },
  };
  return apiAxios
    .get(`garments/`, {
      params: params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error('Error while fetching garments');
    });
};
