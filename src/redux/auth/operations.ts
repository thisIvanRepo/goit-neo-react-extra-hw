import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../../api/AuthApi";
import type { User } from "./slice";

type ApiError = {
  message: string;
};

const fetchLogIn = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/fetchLogIn", async ({ email, password }, thunkAPI) => {
  try {
    const response = await AuthApi.fetchLogin(email, password);

    localStorage.setItem("token", response.data.token);
    
    return response.data;
  } catch (error) {
    const err = error as ApiError;

    return thunkAPI.rejectWithValue(err.message || "somthing when wrong");
  }
});

export const authActions = { fetchLogIn };
