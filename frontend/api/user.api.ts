import axios from "axios";
import { apiUrl } from "./apiUrl";

export const registerUserAPI = async (
  name: string,
  email: string,
  username: string,
  password: string,
) => {
  return await axios.post(`${apiUrl}/user/auth/register`, {
    name,
    email,
    username,
    password,
  });
};

export const loginUserAPI = async (email: string, password: string) => {
  return await axios.post(`${apiUrl}/user/auth/login`, {
    email,
    password,
  });
};

export const fetchUserProfileAPI = async (token: string, userId: string) => {
  return await axios.get(`${apiUrl}/user/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
