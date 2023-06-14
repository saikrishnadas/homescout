import { createSlice } from "@reduxjs/toolkit"
import api from "../../utils/api";
import store from "../../store"
import { useNavigate } from 'react-router-dom';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens')).access
            : null,
        refreshToken: localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens')).refresh
            : null,
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('authTokens');
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

// Token validation on initialization
const validateToken = () => {
    const currentURL = window.location.href;
    console.log(currentURL.split("/")[3])

    const storedTokens = localStorage.getItem("authTokens");

    if (storedTokens) {
        const { access: accessToken } = JSON.parse(storedTokens);

        if (accessToken) {
            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            api
                .get("token/validate/") //validate the access token
                .then((response) => {
                    // If access token is valid, set isAuthenticated to true
                    console.log("response => ", response)
                    if (response.data.valid) {
                        store.dispatch(login({ accessToken }));
                        // const storedTokens = localStorage.getItem("authTokens");
                        // const tokens = storedTokens ? JSON.parse(storedTokens) : {};
                        // tokens.access = accessToken
                        // localStorage.setItem("authTokens", JSON.stringify(tokens));
                    } else {
                        console.log("Token validation failed 1");
                        window.location.href = '/login'
                    }
                })
                .catch((error) => {
                    console.log("Token validation failed:", error);
                    //Call /token/refresh and store the access token to local
                });
        } else {
            // Access token is null or undefined
            console.log("Access token is null or undefined");
        }
    } else {
        // Tokens are not stored in localStorage
        console.log("Tokens are not stored in localStorage");
        if (currentURL.split("/")[3] !== "login" && currentURL.split("/")[3] !== "register" && currentURL.split("/")[3] !== "properties" && currentURL.split("/")[3] !== "details") {
            window.location.href = '/login'
        }

    }
};

validateToken(); // Call the token validation function


const getAccessToken = () => {

}
