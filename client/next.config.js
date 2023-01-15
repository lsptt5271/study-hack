const BasePath = '/study-hack';
const ApiDomain = 'localhost:3001';
const ApiBasePath = '/study-hack-api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BasePath,
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    BasePath,
    ApiBasePath,
    ApiDestination: `http://${ApiDomain}${ApiBasePath}`,
  },
};

module.exports = nextConfig;
