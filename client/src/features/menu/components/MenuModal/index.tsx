import { useCallback, useRef } from 'react';

import { Modal, ModalFooter, ModalMain } from '@/components/elements/Modal';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { useMenuModal } from './hook';
import { MenuForm, MenuFormHandles } from '../MenuForm';

export const MenuModal = () => {
  const { menuModalAtom, hideMenuModal } = useMenuModal();

  const menuFormRef = useRef<MenuFormHandles>(null);

  const main = (
    <ModalMain>
      <MenuForm ref={menuFormRef}></MenuForm>
    </ModalMain>
  );

  const onClickOkButton = useCallback(() => {
    menuFormRef.current?.submit();
  }, []);

  const footer = (
    <ModalFooter>
      <PrimaryButton className={'w-[120px]'} onClick={onClickOkButton}>
        登録
      </PrimaryButton>
    </ModalFooter>
  );

  return <Modal active={menuModalAtom} title="メニュー登録・編集" width={500} movable={true} maskClickable={true} hide={hideMenuModal} main={main} footer={footer} />;
};
