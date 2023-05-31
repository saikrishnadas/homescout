import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

// Add an interceptor to handle access token expiration
api.interceptors.response.use(
    (response) => response, //success call
    async (error) => { //error call
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await api.post("/refresh", {
                    refresh_token: 'saldbajksd',
                });
                const access_token = response.data;
                // Update the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (error) {
                // Handle refresh token failure, e.g., redirect to login page
                console.log('Refresh token expired');
            }
        }
        return Promise.reject(error);
    }
)

export default api;
