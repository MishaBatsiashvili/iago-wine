import axios from 'axios';
import qs from 'querystring';

const customAxios = axios.create({
   baseURL: process.env.REACT_APP_APIURL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
   },
});

customAxios.interceptors.request.use(function (config) {
   config.data = qs.stringify(config.data);
   return config;
});

export default customAxios;
