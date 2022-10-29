import { GraphQLClient } from 'graphql-request';

import getApiDestination from '@/utils/get-api-destination';

const graphqlClient = new GraphQLClient(getApiDestination().concat('/graphql'));

export const getGraphqlClient = (token: string) => {
  graphqlClient.setHeader('authorization', `Bearer ${token}`);

  return graphqlClient;
};
