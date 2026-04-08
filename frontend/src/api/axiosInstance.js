import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {

            if (error.config && error.config.url.includes('/login')) {
                return Promise.reject(error);
            }

            console.warn('Tvoje relace vypršela. Odhlašuji...');
            localStorage.removeItem('user');
            localStorage.setItem('logoutReason', 'session_expired');
            window.location.href = '/';
            return new Promise(() => {});
        }

        return Promise.reject(error);
    }
);

export default api;