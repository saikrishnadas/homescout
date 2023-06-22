import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import countSlice from "./features/countSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        count: countSlice
    }
});

export default store;