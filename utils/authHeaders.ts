import cookie from "js-cookie";

export const getAuthHeaders = () => {
  const jwt = cookie.get(process.env.TOKEN_COOKIE_KEY as string);
  return {
    Authorization: jwt,
  };
};
