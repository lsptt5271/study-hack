import { atom, useAtom } from 'jotai';

type CategoryModalState = {
  active: boolean;
};

const categoryModalAtom = atom<CategoryModalState>({
  active: false,
});

export const useCategoryModal = () => {
  const [state, setState] = useAtom(categoryModalAtom);

  const showCategoryModal = () => setState((state) => ({ ...state, active: true }));

  const hideCategoryModal = () => setState((state) => ({ ...state, active: false }));

  return { categoryModalActive: state.active, showCategoryModal, hideCategoryModal };
};
