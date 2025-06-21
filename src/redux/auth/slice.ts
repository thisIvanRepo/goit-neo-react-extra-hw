import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
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
      .addCase(
        authActions.fetchLogIn.fulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.loading = false;
        }
      )
      .addCase(authActions.fetchLogIn.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
