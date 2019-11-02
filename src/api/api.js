import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? '/api/' : '/shop/api/';
const $axios = axios.create({
  baseURL,
  timeout: 8000
});

$axios.interceptors.response.use((res) => {
  return res.data;
});

export default $axios;
