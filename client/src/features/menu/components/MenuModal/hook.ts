import { atom, useAtom } from 'jotai';

type MenuModalState = {
  active: boolean;
};

const menuModalAtom = atom<MenuModalState>({
  active: false,
});

export const useMenuModal = () => {
  const [state, setState] = useAtom(menuModalAtom);

  const showMenuModal = () => setState((state) => ({ ...state, active: true }));

  const hideMenuModal = () => setState((state) => ({ ...state, active: false }));

  return { menuModalAtom: state.active, showMenuModal, hideMenuModal };
};
