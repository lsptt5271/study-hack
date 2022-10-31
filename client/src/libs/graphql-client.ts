import { ApiDestination } from '@/commons/constant';
import { GraphQLClient } from 'graphql-request';

const graphqlClient = new GraphQLClient(ApiDestination.concat('/graphql'));

export const getGraphqlClient = (token?: string) => {
  if (token) graphqlClient.setHeader('authorization', `Bearer ${token}`);

  return graphqlClient;
};
