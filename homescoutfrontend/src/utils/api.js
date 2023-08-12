import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

let isRefreshing = false;
let refreshSubscribers = [];

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        isRefreshing = true;
        const response = await api.post("token/refresh/", {
            refresh: JSON.parse(localStorage.getItem('authTokens')) ? JSON.parse(localStorage.getItem('authTokens')).refresh : null,
        });
        const { access } = response.data;
        // Update the access token in the local storage
        const storedTokens = JSON.parse(localStorage.getItem("authTokens")) || {};
        storedTokens.access = access;
        localStorage.setItem("authTokens", JSON.stringify(storedTokens));
        // Execute all the pending requests
        refreshSubscribers.forEach(subscriber => subscriber());
        refreshSubscribers = [];
        isRefreshing = false;
        console.log("SALHNDKJANSKDNKNASKDNKJANSDJKNASJKNDJKANSDKJNKASNKDJN")
        return response;
    } catch (error) {
        // Handle refresh token failure, e.g., redirect to login page
        console.log('Refresh token expired');
        // Clear the tokens in the local storage
        localStorage.removeItem("authTokens");
        console.log("KBNASKJDNKASNDNKAJLSNDKJNKJ")
        throw error
        // Redirect to the login page or perform any other necessary action
    }
}

// Add an interceptor to handle access token expiration
api.interceptors.response.use(
    (response) => response, // Success call
    async (error) => {
        // Error call
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (error.response.status === 401 && !error.response?.data.hasOwnProperty("messages")) {
                console.log("SUCESSSSSSSSSS")
                localStorage.removeItem("authTokens");
                window.location.href = "/login";
            }
            if (isRefreshing) {
                // If a refresh token request is already in progress, add the original request to the pending queue
                return new Promise((resolve) => {
                    refreshSubscribers.push(() => {
                        originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem(
                            "authTokens"
                        )
                            ? JSON.parse(localStorage.getItem("authTokens")).access
                            : null}`;
                        resolve(api(originalRequest));
                    });
                });
            }
            originalRequest._retry = true;
            // Refresh the access token
            await refreshAccessToken();
            // Update the original request with the new access token
            originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem(
                "authTokens"
            )
                ? JSON.parse(localStorage.getItem("authTokens")).access
                : null}`;
            try {
                return await api(originalRequest);
            } catch (error) {
                // Handle the case when the refreshed access token also fails
                // Clear the tokens in the local storage
                localStorage.removeItem("authTokens");
                // Redirect to the login page or perform any other necessary action
            }
        }
        return Promise.reject(error);
    }
);

export default api;