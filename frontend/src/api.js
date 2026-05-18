import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.MODE === 'production' 
        ? 'https://ai-based-employee-performance-analytics-85oi.onrender.com/api' 
        : 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
