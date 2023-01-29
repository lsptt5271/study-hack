import { useCallback, useMemo } from 'react';

import { List } from '@/components/elements/List';
import { ListColumn } from '@/components/elements/ListColumn';
import { ListRow } from '@/components/elements/ListRow';
import { useMenuModal } from '@/features/menu/components/MenuModal/hook';
import { useAuth } from '@/providers/auth';
import { MaterialIcon } from '@/components/elements/MaterialIcon';
import { MenuImage } from '@/components/elements/MenuImage';
import { useMenusStore } from '@/features/menu/hooks/store';
import { useAtomValue } from 'jotai';
import { deleteMenuMutationAtom } from '../../hooks/api';

type MenuListProps = {
  isConfig?: boolean;
};

export const MenuList = ({ isConfig }: MenuListProps) => {
  const { showMenuModal } = useMenuModal();
  const { menus } = useMenusStore();
  const deleteMenuMutation = useAtomValue(deleteMenuMutationAtom);

  const onClickDelete = useCallback((menuId: number) => {
    deleteMenuMutation.mutate({ input: { menuId } });
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
