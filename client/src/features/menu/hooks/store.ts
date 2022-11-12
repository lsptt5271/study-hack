import { useMemo } from 'react';

import { useCategoriesStore } from '@/features/category/hooks/store';

export const useMenusStore = () => {
  const { categories } = useCategoriesStore();

  const menus = useMemo(() => categories.flatMap((category) => category.menus.map((menu) => ({ ...menu, category }))), [categories]);

  return { menus };
};
