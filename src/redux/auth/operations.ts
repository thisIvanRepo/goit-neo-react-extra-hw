import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../../api/AuthApi";

const fetchLogIn = createAsyncThunk(
  "auth/fetchLogIn",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await AuthApi.fetchLogin(email, password);
    return response.data;
  }
);

export const authActions = { fetchLogIn };
