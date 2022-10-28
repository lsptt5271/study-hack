const basePath = '/mobile';
const apiDomain = '172.20.2.24';
const apiBasePath = '/mobile_api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: basePath,
  reactStrictMode: false,
  publicRuntimeConfig: {
    basePath,
    apiBasePath,
    apiDestination: `http://${apiDomain}:3001${apiBasePath}`,
  },
};

module.exports = nextConfig;
