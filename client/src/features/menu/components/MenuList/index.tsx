import { useCallback, useEffect } from 'react';

import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useMenuModal } from '@/features/menu/components/MenuModal/hook';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useDeleteCategoryMutation } from '@/repositories/graphql';
import { useGetCategories } from '@/features/category/hooks/query';
import { MaterialIcon } from '@/components/elements/MaterialIcon';

export const MenuList = () => {
  const auth = useAuth();
  const { showMenuModal } = useMenuModal();
  const { getCategoriesQuery, menus } = useGetCategories();
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
            メニュー
          </ListColumn>
          <ListColumn className="w-[40px]" position="center">
            <span className="material-icons cursor-pointer text-3xl" onClick={showMenuModal}>
              add_circle
            </span>
          </ListColumn>
        </ListRow>
      </List>
      <List>
        {menus.map((menu) => (
          <ListRow key={menu.id}>
            <ListColumn className={'flex-1'}>{menu.name}</ListColumn>
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className={'cursor-pointer text-3xl'} onClick={() => onClickDelete(menu.id)}>
                edit
              </MaterialIcon>
            </ListColumn>
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className={'cursor-pointer text-3xl'} onClick={() => onClickDelete(menu.id)}>
                delete
              </MaterialIcon>
            </ListColumn>
          </ListRow>
        ))}
      </List>
    </>
  );
};