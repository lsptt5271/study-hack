import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { CategoryListWrapper } from '@/features/category/components/CategoryListWrapper';
import { MenuListWrapper } from '@/features/menu/components/MenuListWrapper';
import { StudyModal } from '../StudyModal';
import { useStudyModal } from '../StudyModal/hooks';

export const StudyPanel = () => {
  const { showStudyModal } = useStudyModal();

  return (
    <>
      <article className={'flexible h-full p-2'}>
        <section className={'mr-2 flex h-full w-[25%] flex-col'}>
          <CategoryListWrapper />
          <MenuListWrapper />
        </section>
        <section className={'h-full flex-1 rounded bg-primary p-2'}>
          <div className={'flexible h-[40px]'}>
            <h2 className={'flexible-center flex-1 pl-[120px]'}>学習記録</h2>
            <PrimaryButton className={'w-[120px]'} onClick={showStudyModal}>
              新しい学習
            </PrimaryButton>
          </div>
          <StudyModal />
        </section>
      </article>
    </>
  );
};
