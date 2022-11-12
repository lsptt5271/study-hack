import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useGetCategoriesQuery } from '@/repositories/graphql';

export const useCustomGetCategoriesQuery = () => {
  const auth = useAuth();

  return useGetCategoriesQuery(getGraphqlClient(auth), {
    userId: auth?.user.id,
  });
};
