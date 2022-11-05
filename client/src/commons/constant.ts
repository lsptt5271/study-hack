import config from 'next/config';

export const ApiBasePath = config().publicRuntimeConfig.ApiDestination as string;
export const ApiDestination = config().publicRuntimeConfig.ApiDestination as string;
