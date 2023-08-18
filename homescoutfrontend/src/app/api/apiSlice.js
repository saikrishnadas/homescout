import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4001",
    credentials: "include",//To include auth information in cookies
    //sets Authorization token to all the headers
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

//To get accessToken while sending the refreshtoken when accessToken expires
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    //403 means the accessToken is expired
    if (result?.error?.originalStatus === 403) {
        //send the refresh token to get the new access token
        const refreshtoken = await baseQuery('/api/auth/refresh', api, extraOptions);

        if (refreshtoken?.data) {
            const user = api.getState().auth.user;
            //store the new token
            api.dispatch(setCredentials({ ...refreshtoken.data, user }))
            //store the new token in localStorage
            localStorage.setItem("accessToken", refreshtoken.data)
            //retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            //if the status code is not 403 then its unauthorizated
            api.dispatch(logOut())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})