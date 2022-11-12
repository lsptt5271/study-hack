import { useCallback, useEffect } from 'react';

import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useCategoryModal } from '@/features/category/components/CategoryModal/hook';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useDeleteCategoryMutation } from '@/repositories/graphql';
import { useCustomGetCategoriesQuery } from '@/features/category/hooks/query';
import { MaterialIcon } from '@/components/elements/MaterialIcon';
import { useCategoriesStore } from '@/features/category/hooks/store';

export const CategoryList = () => {
  const auth = useAuth();
  const { showCategoryModal } = useCategoryModal();
  const { categories } = useCategoriesStore();
  const getCategoriesQuery = useCustomGetCategoriesQuery();
  const deleteCategoryMutation = useDeleteCategoryMutation(getGraphqlClient(auth));

  const onClickDelete = useCallback((categoryId: number) => {
    deleteCategoryMutation.mutateAsync({ input: { categoryId: categoryId } }).then(() => {
      getCategoriesQuery.refetch();
    });
  }, []);

  return (
    <>
      <List>
        <ListRow>
          <ListColumn className={'flex-1 pl-[40px]'} position="center">
            カテゴリー
          </ListColumn>
          <ListColumn className="w-[40px]" position="center">
            <MaterialIcon className="material-icons text-3xl" onClick={showCategoryModal}>
              add_circle
            </MaterialIcon>
          </ListColumn>
        </ListRow>
      </List>
      <List className={'flex-1'}>
        {categories.map((category) => (
          <ListRow key={category.id}>
            <ListColumn className={'flex-1'}>{category.name}</ListColumn>
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className={'text-3xl'} onClick={() => onClickDelete(category.id)}>
                edit
              </MaterialIcon>
            </ListColumn>
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className={'text-3xl'} onClick={() => onClickDelete(category.id)}>
                delete
              </MaterialIcon>
            </ListColumn>
          </ListRow>
        ))}
      </List>
    </>
  );
};
