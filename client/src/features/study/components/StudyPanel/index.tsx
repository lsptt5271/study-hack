import { CategoryList } from '../CategoryList';
import { CategoryModal } from '../CategoryModal';

export const StudyPanel = () => {
  return (
    <>
      <article className={'flexible h-full p-2'}>
        <section className={'h-full w-[50%]'}>
          <CategoryList />
        </section>
        <section className={'h-full flex-1'}></section>
      </article>
      <article>
        <CategoryModal />
      </article>
    </>
  );
};
