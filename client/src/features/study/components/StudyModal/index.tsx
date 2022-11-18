import { Modal, ModalFooter, ModalMain } from '@/components/elements/Modal';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { StudyForm } from '../StudyForm';
import { useStudyModal } from './hooks';

export const StudyModal = () => {
  const { studyModalActive, hideStudyModal } = useStudyModal();

  const main = (
    <ModalMain>
      <StudyForm />
    </ModalMain>
  );

  const footer = (
    <ModalFooter>
      <PrimaryButton className={'w-[120px]'}>登録</PrimaryButton>
    </ModalFooter>
  );

  return <Modal active={studyModalActive} title="新しい学習を記録" width={500} movable={true} maskClickable={true} hide={hideStudyModal} main={main} footer={footer} />;
};
