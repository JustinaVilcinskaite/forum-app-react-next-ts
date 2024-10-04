import { emailRegex, passwordRegex } from "../utils/regex";

type SignUpValidationParams = {
  name: string;
  email: string;
  password: string;
};

export const validateSignUp = ({
  name,
  email,
  password,
}: SignUpValidationParams) => {
  if (!name || !email || !password) {
    return "All fields are required.";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email.";
  }
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters and contain at least one number.";
  }
  return "";
};
