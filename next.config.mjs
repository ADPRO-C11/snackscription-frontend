/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // console.log('NEXT_PUBLIC_AUTH_API:', process.env.NEXT_PUBLIC_AUTH_API);
    // console.log('NEXT_PUBLIC_SUBSCRIPTION_API:', process.env.NEXT_PUBLIC_SUBSCRIPTION_API);
    // console.log('NEXT_PUBLIC_SUBSCRIPTION_BOX_API:', process.env.NEXT_PUBLIC_SUBSCRIPTION_BOX_API);
    // console.log('NEXT_PUBLIC_API_REVIEW_URL:', process.env.NEXT_PUBLIC_API_REVIEW_URL);
    // console.log('NEXT_PUBLIC_SUBSCRIPTION_ADMIN_API:', process.env.NEXT_PUBLIC_SUBSCRIPTION_ADMIN_API);

    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_API || 'http://default-auth-api'}/:path*`,
      },
      {
        source: '/api/subscription/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUBSCRIPTION_API || 'http://default-subscription-api'}/:path*`,
      },
      {
        source: '/api/subscription-box/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUBSCRIPTION_BOX_API || 'http://default-subscription-box-api'}/:path*`,
      },
      {
        source: '/api/review/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_REVIEW_URL || 'http://default-review-api'}/:path*`,
      },
      {
        source: '/api/subscription-admin/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUBSCRIPTION_ADMIN_API || 'http://default-subscription-admin-api'}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

export default nextConfig;
