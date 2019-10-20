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
