/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '217.199.253.61',
                port: '5000',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;