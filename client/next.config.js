const BasePath = '/study_hack';
const ApiDomain = 'frontend-7mlp663pxa-an.a.run.app';
const ApiBasePath = '/study_hack_api';

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
