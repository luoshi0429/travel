import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? '/shop/api/' : '/shop/api/';
const $axios = axios.create({
  baseURL,
  timeout: 8000
});
$axios.interceptors.request.use((config) => {
  // Do something before request is sent
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});
$axios.interceptors.response.use((res) => {
  return res.data;
});

export default $axios;
