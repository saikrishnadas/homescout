import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import countSlice from "./features/countSlice";
import filterSilce from "./features/filterSilce";
import postPropertySlice from "./features/postPropertySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        count: countSlice,
        postProperty: postPropertySlice,
        filter: filterSilce
    }
});

export default store;