import { useCallback, useMemo } from 'react';

import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useMenuModal } from '@/features/menu/components/MenuModal/hook';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useDeleteMenuMutation } from '@/repositories/graphql';
import { MaterialIcon } from '@/components/elements/MaterialIcon';
import { MenuImage } from '@/components/elements/MenuImage';
import { useMenusStore } from '@/features/menu/hooks/store';
import { useCustomGetCategoriesQuery } from '@/features/category/hooks/query';

type MenuListProps = {
  isConfig?: boolean;
};

export const MenuList = ({ isConfig }: MenuListProps) => {
  const auth = useAuth();
  const { showMenuModal } = useMenuModal();
  const { menus } = useMenusStore();
  const getCategoriesQuery = useCustomGetCategoriesQuery();
  const deleteMenuMutation = useDeleteMenuMutation(getGraphqlClient(auth));

  const onClickDelete = useCallback((menuId: number) => {
    deleteMenuMutation.mutateAsync({ input: { menuId } }).then(() => {
      getCategoriesQuery.refetch();
    });
  }, []);

  const headerListColumnDynamicClassName = useMemo(() => {
    return isConfig ? 'pl-[40px]' : '';
  }, [isConfig]);

  return (
    <>
      <List>
        <ListRow>
          <ListColumn className={`flex-1 ${headerListColumnDynamicClassName}`} position="center">
            メニュー
          </ListColumn>
          {isConfig && (
            <ListColumn className="w-[40px]" position="center">
              <MaterialIcon className="material-icons text-3xl" onClick={showMenuModal}>
                add_circle
              </MaterialIcon>
            </ListColumn>
          )}
        </ListRow>
      </List>
      <List className={'flex-1'}>
        {menus.map((menu) => (
          <ListRow key={menu.id} className="h-[100px]">
            <ListColumn>
              <MenuImage menuId={menu.id} />
            </ListColumn>
            <ListColumn className={'flex-1 flex-col items-start'}>
              <div>{menu.name}</div>
              <div>カテゴリー：{menu.category.name}</div>
            </ListColumn>
            {isConfig && (
              <>
                <ListColumn className="w-[40px]" position="center">
                  <MaterialIcon className={'text-3xl'} onClick={() => onClickDelete(menu.id)}>
                    edit
                  </MaterialIcon>
                </ListColumn>
                <ListColumn className="w-[40px]" position="center">
                  <MaterialIcon className={'text-3xl'} onClick={() => onClickDelete(menu.id)}>
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
