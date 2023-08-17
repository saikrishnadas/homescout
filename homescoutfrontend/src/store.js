import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./app/api/apiSlice";
import authReducer from "./features/auth/authSlice"
import countSlice from "./features/countSlice";
import filterSilce from "./features/filterSilce";
import postPropertySlice from "./features/postPropertySlice";
import propertySlice from "./features/propertiesSlice"
import updatePropertySlice from "./features/updatePropertySlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        count: countSlice,
        postProperty: postPropertySlice,
        filter: filterSilce,
        properties: propertySlice,
        updateProperty: updatePropertySlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), //This middleware is need to make RTK query
});

export default store;