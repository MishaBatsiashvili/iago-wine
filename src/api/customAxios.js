import axios from 'axios';
import qs from 'querystring';

const customAxios = axios.create({
   baseURL: 'https://iago.ge/api/api.php',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
   },
});

customAxios.interceptors.request.use(function (config) {
   console.log(config);
   config.data = qs.stringify(config.data);
   return config;
});

export default customAxios;