import axios from 'axios';
import qs from 'querystring';

console.log(process.env.SECRET_CODE);
const customAxios = axios.create({
   baseURL: process.env.REACT_APP_APIURL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
   },
});

console.log(process.env);
// debugger;

customAxios.interceptors.request.use(function (config) {
   console.log(config);
   config.data = qs.stringify(config.data);
   return config;
});

export default customAxios;