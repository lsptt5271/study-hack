import { atomsWithMutation } from 'jotai-tanstack-query';

import { getGraphqlClient } from '@/libs/graphql-client';
import { authAtom } from '@/providers/auth';
import { getSdk, RegisterUserMutationVariables } from '@/repositories/graphql';

export const [registerUserAtom, registerUserMutationAtom] = atomsWithMutation((get) => ({
  mutationkey: ['registerUser'],
  mutationFn: async (variables: RegisterUserMutationVariables) => {
    return await getSdk(getGraphqlClient(get(authAtom))).registerUser(variables);
  },
}));
