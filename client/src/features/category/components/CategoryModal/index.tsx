import { useCallback, useRef } from 'react';

import { Modal, ModalFooter, ModalMain } from '@/components/elements/Modal';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { CategoryForm, CategoryFormHandles } from '@/features/category/components/CategoryForm';
import { useCategoryModal } from './hook';

export const CategoryModal = () => {
  const { categoryModalActive, hideCategoryModal } = useCategoryModal();

  const categoryFormRef = useRef<CategoryFormHandles>(null);

  const main = (
    <ModalMain>
      <CategoryForm ref={categoryFormRef}></CategoryForm>
    </ModalMain>
  );

  const onClickOkButton = useCallback(() => {
    categoryFormRef.current?.submit();
  }, []);

  const footer = (
    <ModalFooter>
      <PrimaryButton className={'w-[120px]'} onClick={onClickOkButton}>
        登録
      </PrimaryButton>
    </ModalFooter>
  );

  return <Modal active={categoryModalActive} title="カテゴリー登録・編集" width={500} movable={true} maskClickable={true} hide={hideCategoryModal} main={main} footer={footer} />;
};
