import axios from 'axios';
import { config } from 'dotenv';

const api = axios.create({
  baseURL: 'https://brewery-2dee.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config)=>{
  const res = JSON.parse(localStorage.getItem('user'))

    if (res && res.token) {
      config.headers.Authorization = `Bearer ${res.token}`;
    }
    return config;
},
  error => Promise.reject(error)
)
export default api;
