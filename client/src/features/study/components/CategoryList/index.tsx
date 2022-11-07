import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useCategoryModal } from '../CategoryModal/hook';

export const CategoryList = () => {
  const { showCategoryModal } = useCategoryModal();

  return (
    <div className={'h-[50%] w-[50%] rounded bg-primary p-1'}>
      <List>
        <ListRow>
          <ListColumn className={'flex-1'} position="center">
            カテゴリー名
          </ListColumn>
        </ListRow>
      </List>
      <List>aa</List>
      <button onClick={() => showCategoryModal()}>登録</button>
    </div>
  );
};
