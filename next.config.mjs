/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: "https://forum-api-node-express.onrender.com",
    TOKEN_COOKIE_KEY: "forum_app_jwt",
  },
};

export default nextConfig;
