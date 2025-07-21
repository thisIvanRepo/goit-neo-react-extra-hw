import { createSlice } from "@reduxjs/toolkit";
import { authActions } from "./operations";

export interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
}

const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  isLoggedIn: !!token,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authActions.fetchLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(authActions.fetchLogIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(authActions.fetchLogIn.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(authActions.fetchSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(authActions.fetchSignup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(authActions.fetchSignup.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(authActions.fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(authActions.fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(authActions.fetchLogout.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(authActions.fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authActions.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(authActions.fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
