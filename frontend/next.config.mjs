/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Specify the exact hostname
        pathname: "/dxv01t8ic/**", // Optional: Restrict to specific paths
      },
      // Add more patterns as needed
    ],
  },
};

export default nextConfig;
