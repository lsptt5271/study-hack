import { atomsWithMutation } from 'jotai-tanstack-query';

import { getGraphqlClient } from '@/libs/graphql-client';
import { queryClient } from '@/libs/react-query';
import { authAtom } from '@/providers/auth';
import { CreateMenuMutationVariables, DeleteMenuMutationVariables, getSdk } from '@/repositories/graphql';

export const [createMenuAtom, createMenuMutationAtom] = atomsWithMutation((get) => ({
  mutationkey: ['createMenu'],
  mutationFn: async (variables: CreateMenuMutationVariables) => {
    return await getSdk(getGraphqlClient(get(authAtom))).createMenu(variables);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['categories']);
  },
}));

export const [deleteCatgegoryAtom, deleteMenuMutationAtom] = atomsWithMutation((get) => ({
  mutationkey: ['deleteMenu'],
  mutationFn: async (variables: DeleteMenuMutationVariables) => {
    return await getSdk(getGraphqlClient(get(authAtom))).deleteMenu(variables);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['categories']);
  },
}));
