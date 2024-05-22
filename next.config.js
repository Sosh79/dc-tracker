/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "t3.ftcdn.net",
            },
        ],
    },
};
module.exports = nextConfig
