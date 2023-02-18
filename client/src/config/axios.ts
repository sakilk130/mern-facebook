import axios from 'axios';
import Cookies from 'js-cookie';

const user = JSON.parse(Cookies.get('user') || '{}');
const token = user.token;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:8000/api/v1',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token,
  },
});

export default axiosInstance;
