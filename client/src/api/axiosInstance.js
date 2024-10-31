import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://134.209.246.21:9000/api/v1',
  // baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
