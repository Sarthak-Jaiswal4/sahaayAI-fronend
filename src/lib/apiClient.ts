import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useFarmerStore } from '@/store/useFarmerStore';

/**
 * Axios instance with automatic token injection
 * 
 * This instance automatically adds the JWT token from the Zustand store
 * to all requests. Use this for authenticated API calls.
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useFarmerStore.getState().token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // If we get a 401/403, logout the user
        if (error.response?.status === 401 || error.response?.status === 403) {
            const { logout } = useFarmerStore.getState();
            logout();

            // Optionally redirect to signin
            if (typeof window !== 'undefined') {
                window.location.href = '/signin';
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
