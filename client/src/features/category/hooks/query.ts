import { useMemo } from 'react';

import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useGetCategoriesQuery } from '@/repositories/graphql';
import { useSelectedCategory } from './selected-category';

export const useGetCategories = () => {
  const auth = useAuth();
  const getCategoriesQuery = useGetCategoriesQuery(getGraphqlClient(auth), {
    userId: auth?.user.id,
  });
  const categories = getCategoriesQuery.data?.categories || [];
  const { selectedCategoryId } = useSelectedCategory();
  const menus = useMemo(() => {
    return categories.find((category) => category.id === selectedCategoryId)?.menus || [];
  }, [categories, selectedCategoryId]);

  return { categories, getCategoriesQuery, menus };
};
