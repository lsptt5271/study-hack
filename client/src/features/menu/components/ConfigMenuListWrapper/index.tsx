import { Suspense } from 'react';

import { MenuList } from '@/features/menu/components/MenuList';
import { LoadingMask } from '@/components/elements/LoadingMask';

export const ConfigMenuListWrapper = () => {
  return (
    <div className={'flex h-full flex-col rounded bg-primary p-1'}>
      <Suspense fallback={<LoadingMask />}>
        <MenuList isConfig={true} />
      </Suspense>
    </div>
  );
};
