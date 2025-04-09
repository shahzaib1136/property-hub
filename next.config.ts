import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**", // Optional: define the path structure if needed
      },
    ],
  },
};

export default nextConfig;
