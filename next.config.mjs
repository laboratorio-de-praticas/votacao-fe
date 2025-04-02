/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cps.sp.gov.br",
      },
    ],
  },
};

export default nextConfig;
