import { GraphQLClient } from 'graphql-request';

import { ApiDestination } from '@/commons/constant';

const graphqlClient = new GraphQLClient(ApiDestination.concat('/graphql'));

export const getGraphqlClient = (token?: string) => {
  if (token) graphqlClient.setHeader('authorization', `Bearer ${token}`);

  return graphqlClient;
};
