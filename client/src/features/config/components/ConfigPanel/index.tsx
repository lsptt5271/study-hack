import { CategoryModal } from '@/features/category/components/CategoryModal';
import { ConfigCategoryListWrapper } from '@/features/category/components/ConfigCategoryListWrapper';
import { ConfigMenuListWrapper } from '@/features/menu/components/ConfigMenuListWrapper';
import { MenuModal } from '@/features/menu/components/MenuModal';

export const ConfigPanel = () => {
  return (
    <article className={'flexible h-full p-2'}>
      <section className={'mr-2 h-full w-1/2'}>
        <ConfigCategoryListWrapper />
        <CategoryModal />
      </section>
      <section className={'h-full w-1/2'}>
        <ConfigMenuListWrapper />
        <MenuModal />
      </section>
    </article>
  );
};
