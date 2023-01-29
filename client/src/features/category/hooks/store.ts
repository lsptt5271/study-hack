import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { getCategoriesAtom } from './api';

export const useCategoriesStore = () => {
  const { categories } = useAtomValue(getCategoriesAtom);

  return { categories };
};
