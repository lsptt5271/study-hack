import { useMemo } from 'react';
import { useCustomGetCategoriesQuery } from './query';

export const useCategoriesStore = () => {
  const getCategoriesQuery = useCustomGetCategoriesQuery();

  const categories = useMemo(() => getCategoriesQuery.data?.categories || [], [getCategoriesQuery.data]);

  return { categories };
};
