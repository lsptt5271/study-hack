import { Suspense } from 'react';
import { CategoryList } from '../CategoryList';

export const CategoryListWrapper = () => {
  return (
    <div className={'h-[50%] w-[50%] rounded bg-primary p-1'}>
      <Suspense fallback={<div>loading...</div>}>
        <CategoryList />
      </Suspense>
    </div>
  );
};
