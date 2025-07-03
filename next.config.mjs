/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 
      "192.168.68.101",
      "127.0.0.1"
    ],
  },
};

export default nextConfig;
