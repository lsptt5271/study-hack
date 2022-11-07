import { Modal, ModalFooter, ModalMain } from '@/components/elements/Modal';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { useRef } from 'react';
import { CategoryForm, CategoryFormHandles } from '../CategoryForm';
import { useCategoryModal } from './hook';

export const CategoryModal = () => {
  const { categoryModalActive, hideCategoryModal } = useCategoryModal();

  const categoryFormRef = useRef<CategoryFormHandles>(null);

  const main = (
    <ModalMain>
      <CategoryForm ref={categoryFormRef}></CategoryForm>
    </ModalMain>
  );

  const footer = (
    <ModalFooter>
      <PrimaryButton className={'w-[120px]'} onClick={categoryFormRef.current?.submit}>
        登録
      </PrimaryButton>
    </ModalFooter>
  );

  return <Modal active={categoryModalActive} title="カテゴリー登録・編集" width={500} movable={true} maskClickable={true} hide={hideCategoryModal} main={main} footer={footer} />;
};
