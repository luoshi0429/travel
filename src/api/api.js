import axios from 'axios';

const $axios = axios.create({
  baseURL: '/api/shop/',
  timeout: 8000
});

$axios.interceptors.response.use((res) => {
  console.info(res);
  return res.data;
});

export default $axios;
