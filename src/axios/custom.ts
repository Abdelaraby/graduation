import axios from "axios";

const customFetch = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        Accept: "application/json"
    }
})
// Add Authorization token to request headers if available
customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Make sure to store the token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;
