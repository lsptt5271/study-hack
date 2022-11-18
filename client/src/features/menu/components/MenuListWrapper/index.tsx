import { Suspense } from 'react';

import { MenuList } from '@/features/menu/components/MenuList';
import { LoadingMask } from '@/components/elements/LoadingMask';

export const MenuListWrapper = () => {
  return (
    <div className={'flex h-[50%] flex-col rounded bg-primary p-1'}>
      <Suspense fallback={<LoadingMask />}>
        <MenuList />
      </Suspense>
    </div>
  );
};
