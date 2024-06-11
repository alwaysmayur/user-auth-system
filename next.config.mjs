/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/register',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
