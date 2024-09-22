import cookie from "js-cookie";

export const getAuthHeaders = () => {
  const jwt = cookie.get(process.env.JWT_KEY as string);
  return {
    authorization: jwt,
  };
};
