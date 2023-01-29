import { getGraphqlClient } from '@/libs/graphql-client';
import { authAtom } from '@/providers/auth';
import { CreateCategoryMutationVariables, DeleteCategoryMutationVariables, getSdk } from '@/repositories/graphql';
import { atomsWithMutation, atomsWithQuery } from 'jotai-tanstack-query';
import { queryClientAtom } from 'jotai-tanstack-query';

export const [getCategoriesAtom, getCategoriesQueryAtom] = atomsWithQuery((get) => {
  return {
    queryKey: ['categories'],
    queryFn: async () => {
      return await getSdk(getGraphqlClient(get(authAtom))).getCategories({ userId: get(authAtom)?.user.id || 0 });
    },
  };
});

export const [createCategoryAtom, createCateogryMutationAtom] = atomsWithMutation((get) => ({
  mutationkey: ['createCategory'],
  mutationFn: async (variables: CreateCategoryMutationVariables) => {
    return await getSdk(getGraphqlClient(get(authAtom))).createCategory(variables);
  },
  onSettled: () => {
    get(queryClientAtom).invalidateQueries(['categories']);
  },
}));

export const [deleteCatgegoryAtom, deleteCateogryMutationAtom] = atomsWithMutation((get) => ({
  mutationkey: ['deleteCategory'],
  mutationFn: async (variables: DeleteCategoryMutationVariables) => {
    return await getSdk(getGraphqlClient(get(authAtom))).deleteCategory(variables);
  },
  onSettled: () => {
    get(queryClientAtom).invalidateQueries(['categories']);
  },
}));
