import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'https://markethub-api-gateway.onrender.com/';

const api = axios.create({
  baseURL: BASE.replace(/\/+$/, ''), // remove trailing slash
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Optional: add a simple response interceptor to return data directly
api.interceptors.response.use(
  (resp) => resp.data,
  (err) => Promise.reject(err.response && err.response.data ? err.response.data : err)
);

export default api;
