import cookie from "js-cookie";

export const getAuthHeaders = () => {
  const jwt = cookie.get(process.env.JWT_KEY as string);
  return {
    Authorization: jwt,
  };
};

// go bato to this
// ar butina cia validacija. neatsimenu kodel as cia taip pasirasiau
// jwt turi nerodyti arba i login
// export const getAuthHeaders = () => {
//   const jwt = cookie.get(process.env.JWT_KEY as string);
//   if (!jwt) {
//     return;
//   }
//   return {
//     authorization: jwt,
//   };
// };
