import { Suspense } from 'react';

import { CategoryList } from '@/features/category/components/CategoryList';
import { LoadingMask } from '@/components/elements/LoadingMask';

export const ConfigCategoryListWrapper = () => {
  return (
    <div className={'h-full rounded bg-primary p-1'}>
      <Suspense fallback={<LoadingMask />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};
