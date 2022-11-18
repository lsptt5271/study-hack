import { atom, useAtom } from 'jotai';

type StudyModalState = {
  active: boolean;
};

const StudyModalAtom = atom<StudyModalState>({
  active: false,
});

export const useStudyModal = () => {
  const [state, setState] = useAtom(StudyModalAtom);

  const showStudyModal = () => setState((state) => ({ ...state, active: true }));

  const hideStudyModal = () => setState((state) => ({ ...state, active: false }));

  return { studyModalActive: state.active, showStudyModal, hideStudyModal };
};
