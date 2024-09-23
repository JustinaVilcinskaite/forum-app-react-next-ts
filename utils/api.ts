import cookie from "js-cookie";

export const getAuthHeaders = () => {
  const jwt = cookie.get(process.env.JWT_KEY as string);
  if (!jwt) {
    console.error("No JWT token found");
  }
  return {
    authorization: jwt,
  };
};
