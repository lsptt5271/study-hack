import { Suspense } from 'react';

import { CategoryList } from '@/features/category/components/CategoryList';
import { LoadingMask } from '@/components/elements/LoadingMask';

export const CategoryListWrapper = () => {
  return (
    <div className={'h-[50%] w-[50%] rounded bg-primary p-1'}>
      <Suspense fallback={<LoadingMask />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};
