/** @type {import('next').NextConfig} */


const nextConfig = {

    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    // in production reactStrictMode is set to false by default. Set to false if you want to stop useEffect for running twice in development.
    reactStrictMode: false, // default true
    swcMinify: true,
    env: {
        server_uri: process.env.NEXT_PUBLIC_SERVER_URI,
        FAKE_LOGIN: process.env.FAKE_LOGIN,
        FAKE_API_CALLS: process.env.FAKE_API_CALLS,
        payment_stripe_publishable_key: process.env.PAYMENT_STRIPE_PUBLISHABLE_KEY,
        payment_stripe_return_url: process.env.PAYMENT_STRIPE_RETURN_URL,
        payment_paypal_client_id: process.env.PAYMENT_PAYPAL_CLIENT_ID,
    },
    images: {
        domains: [
            'assets.vercel.com',
            'www.freeiconspng.com',
            'res.cloudinary.com',
            'myphone-pos.onrender.com',
            "pos-beta.onrender.com",
            "127.0.0.1",
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 5000 * 60,
    },
}

module.exports = nextConfig
