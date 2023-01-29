import { useCallback, useEffect, useMemo } from 'react';

import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useCategoryModal } from '@/features/category/components/CategoryModal/hook';
import { getGraphqlClient } from '@/libs/graphql-client';
import { MaterialIcon } from '@/components/elements/MaterialIcon';
import { useCategoriesStore } from '@/features/category/hooks/store';
import { useAtomValue } from 'jotai';
import { deleteCateogryMutationAtom } from '../../hooks/api';

type CategoryListProps = {
  isConfig?: boolean;
};

export const CategoryList = ({ isConfig = false }: CategoryListProps) => {
  const { showCategoryModal } = useCategoryModal();
  const { categories } = useCategoriesStore();
  const deleteCategoryMutation = useAtomValue(deleteCateogryMutationAtom);

  const onClickDelete = useCallback((categoryId: number) => {
    deleteCategoryMutation.mutate({ input: { categoryId: categoryId } });
  }, []);

  const headerListColumnDynamicClassName = useMemo(() => {
    return isConfig ? 'pl-[40px]' : '';
  }, [isConfig]);

  return (
    <>
      <List>
        <ListRow>
          <ListColumn className={`flex-1 ${headerListColumnDynamicClassName}`} position="center">
            カテゴリー
          </ListColumn>
          {isConfig && (
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className="material-icons text-3xl" onClick={showCategoryModal}>
                add_circle
              </MaterialIcon>
            </ListColumn>
          )}
        </ListRow>
      </List>
      <List className={'flex-1'}>
        {categories.map((category) => (
          <ListRow key={category.id}>
            <ListColumn className={'flex-1'}>{category.name}</ListColumn>
            {isConfig && (
              <>
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
              </>
            )}
          </ListRow>
        ))}
      </List>
    </>
  );
};
