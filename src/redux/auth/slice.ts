import { createSlice } from "@reduxjs/toolkit";
import { authActions } from "./operations";

export interface User {
  name: string;
  email: string;
}

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authActions.fetchLogIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export default authSlice.reducer;
