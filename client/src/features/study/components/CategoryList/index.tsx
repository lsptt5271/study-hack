import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useGetCategoriesQuery } from '@/repositories/graphql';
import { useCategoryModal } from '../CategoryModal/hook';

export const CategoryList = () => {
  const auth = useAuth();
  const { showCategoryModal } = useCategoryModal();
  const query = useGetCategoriesQuery(getGraphqlClient(auth));

  return (
    <>
      <List>
        <ListRow>
          <ListColumn className={'flex-1'} position="center">
            カテゴリー名
          </ListColumn>
          <ListColumn className="w-[40px]" position="center">
            <span className="material-icons cursor-pointer text-3xl" onClick={showCategoryModal}>
              add_circle
            </span>
          </ListColumn>
        </ListRow>
      </List>
      <List>
        {query.data?.categories.map((category) => (
          <ListRow key={category.id}>
            <ListColumn className={'flex-1'}>{category.name}</ListColumn>
            <ListColumn className="w-[50px]" position="center">
              <PrimaryButton>削除</PrimaryButton>
            </ListColumn>
          </ListRow>
        ))}
      </List>
    </>
  );
};
