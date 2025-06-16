import type { User } from "../redux/auth/slice";
import publicApi from "./publicApi";

const fetchLogin = (email: string, password: string) => {
  return publicApi.post("/users/login", {
    email,
    password,
  }) as Promise<{ user: User; token: string }>;
};

export const AuthApi = { fetchLogin };
