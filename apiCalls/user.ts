import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";

// ?
type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const signUp = async ({ name, email, password }: SignUpProps) => {
  const body = {
    name,
    email,
    password,
  };

  const response = await axios.post(`${process.env.SERVER_URL}/register`, body);
  return response;
};

// ?
type LoginProps = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginProps) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await axios.post(`${process.env.SERVER_URL}/login`, body);
  return response;
};

export const validateUser = async () => {
  const headers = getAuthHeaders();

  const response = await axios.get(`${process.env.SERVER_URL}/login/validate`, {
    headers,
  });

  return response;
};
