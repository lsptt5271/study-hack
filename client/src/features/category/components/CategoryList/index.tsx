import { useCallback, useEffect } from 'react';

import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useCategoryModal } from '@/features/category/components/CategoryModal/hook';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useDeleteCategoryMutation } from '@/repositories/graphql';
import { useGetCategories } from '@/features/category/hooks/query';
import { useSelectedCategory } from '@/features/category/hooks/selected-category';
import { MaterialIcon } from '@/components/elements/MaterialIcon';

export const CategoryList = () => {
  const auth = useAuth();
  const { showCategoryModal } = useCategoryModal();
  const { categories, getCategoriesQuery } = useGetCategories();
  const deleteCategoryMutation = useDeleteCategoryMutation(getGraphqlClient(auth));
  const { selectedCategoryId, setSelectedCategoryId } = useSelectedCategory();

  const onClickDelete = useCallback((categoryId: number) => {
    deleteCategoryMutation.mutateAsync({ input: { categoryId: categoryId } }).then(() => {
      getCategoriesQuery.refetch();
    });
  }, []);

  const onClickRow = useCallback(
    (categtoryId: number) => {
      setSelectedCategoryId(categtoryId);
    },
    [setSelectedCategoryId]
  );

  useEffect(() => {
    if (categories.length) {
      setSelectedCategoryId(categories[0].id);
    }
  }, []);

  return (
    <>
      <List>
        <ListRow>
          <ListColumn className={'flex-1 pl-[40px]'} position="center">
            カテゴリー
          </ListColumn>
          <ListColumn className="w-[40px]" position="center">
            <span className="material-icons cursor-pointer text-3xl" onClick={showCategoryModal}>
              add_circle
            </span>
          </ListColumn>
        </ListRow>
      </List>
      <List>
        {categories.map((category) => (
          <ListRow className={'cursor-pointer'} key={category.id} selected={selectedCategoryId === category.id} onClick={() => onClickRow(category.id)}>
            <ListColumn className={'flex-1'}>{category.name}</ListColumn>
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className={'cursor-pointer text-3xl'} onClick={() => onClickDelete(category.id)}>
                edit
              </MaterialIcon>
            </ListColumn>
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className={'cursor-pointer text-3xl'} onClick={() => onClickDelete(category.id)}>
                delete
              </MaterialIcon>
            </ListColumn>
          </ListRow>
        ))}
      </List>
    </>
  );
};
