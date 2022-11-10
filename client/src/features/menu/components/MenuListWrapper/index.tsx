import { Suspense } from 'react';

import { MenuList } from '@/features/menu/components/MenuList';
import { LoadingMask } from '@/components/elements/LoadingMask';

export const MenuListWrapper = () => {
  return (
    <div className={'h-[50%] w-[50%] rounded bg-primary p-1'}>
      <Suspense fallback={<LoadingMask />}>
        <MenuList />
      </Suspense>
    </div>
  );
};
