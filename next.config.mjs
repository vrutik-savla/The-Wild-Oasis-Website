/** @type {import('next').NextConfig} */
// 445. Fetching and Displaying Cabin List
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bagmhqpaglysxekrbvvo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
