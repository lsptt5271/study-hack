const BasePath = '/study_hack';
const ApiDomain = 'localhost:3001';
const ApiBasePath = '/study_hack_api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BasePath,
  reactStrictMode: false,
  publicRuntimeConfig: {
    BasePath,
    ApiBasePath,
    ApiDestination: `http://${ApiDomain}${ApiBasePath}`,
  },
};

module.exports = nextConfig;
