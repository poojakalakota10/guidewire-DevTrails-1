import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? '/api/' : 'http://localhost:4001/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gigshield_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
