import config from 'next/config';

export const ApiDestination = config().publicRuntimeConfig.apiDestination as string;
