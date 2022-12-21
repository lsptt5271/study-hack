const BasePath = '/study-hack';
const ApiDomain = 'api-7mlp663pxa-an.a.run.app';
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
    ApiDestination: `https://${ApiDomain}${ApiBasePath}`,
  },
};

module.exports = nextConfig;
