import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**", // Optional: define the path structure if needed
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // Optional: define the path structure if needed
      },
    ],
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
};

export default nextConfig;
