import type { User } from "../redux/auth/slice";
import privateApi from "./privateApi";
import publicApi from "./publicApi";

const fetchLogin = (email: string, password: string) => {
  return publicApi.post("/users/login", {
    email,
    password,
  }) as Promise<{ data: { user: User; token: string } }>;
};

const fetchSignup = (name: string, email: string, password: string) => {
  return publicApi.post("/users/signup", {
    name,
    email,
    password,
  }) as Promise<{ data: { user: User; token: string } }>;
};

const fetchLogout = () => {
  return privateApi.post("/users/logout") as Promise<void>;
};

const fetchCurrentUser = () => {
  return privateApi.get("/users/current") as Promise<{ data: User }>;
};

export const AuthApi = {
  fetchLogin,
  fetchCurrentUser,
  fetchSignup,
  fetchLogout,
};
