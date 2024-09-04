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
        pathname:
          "/a/ACg8ocIcmisOLJtTKMQciTMpcs_YABSahnnsd2pji9Htn25Vvh1lrSVA=s96-c",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
