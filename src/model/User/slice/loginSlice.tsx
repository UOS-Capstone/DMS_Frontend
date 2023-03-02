import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        //SSL 통신 이후 refresh 파트 구현
        //refreshToken:'',
        accessToken: '',
        loading: false,
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.data;
            //SSL 통신 이후 refresh 파트 구현
            //state.refreshToken = action.payload.headers.Cookies;
        },
        loginFailure: (state) => {
            state.loading = false;
        }
    }
});
export const loginRequest = loginSlice.actions.loginRequest;
export const loginSuccess = loginSlice.actions.loginSuccess;
export const loginFailure = loginSlice.actions.loginFailure;

export default loginSlice.reducer;