import api from './api';

export const getProductList = (params) => {
  return api.get('/getProductList', { params });
};
