const basePath = '/study_hack';
const apiDomain = 'localhost:3001';
const apiBasePath = '/study_hack_api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: basePath,
  reactStrictMode: false,
  publicRuntimeConfig: {
    basePath,
    apiBasePath,
    apiDestination: `http://${apiDomain}${apiBasePath}`,
  },
};

module.exports = nextConfig;
