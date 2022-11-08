import { GraphQLClient } from 'graphql-request';

import { ApiDestination } from '@/commons/constant';
import { Auth } from '@/@types';

const graphqlClient = new GraphQLClient(ApiDestination.concat('/graphql'));

export const getGraphqlClient = (auth?: Auth | null) => {
  if (auth) graphqlClient.setHeader('authorization', `Bearer ${auth.token}`);

  return graphqlClient;
};
