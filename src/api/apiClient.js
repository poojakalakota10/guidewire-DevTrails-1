import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://guidewire-devtrails-1-1.onrender.com/api/', // Pointing to Production Render Server with trailing slash
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
