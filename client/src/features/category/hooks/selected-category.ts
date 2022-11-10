import { atom, useAtom } from 'jotai';

const selectedCategoryIdAtom = atom(0);

export const useSelectedCategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useAtom(selectedCategoryIdAtom);

  return { selectedCategoryId, setSelectedCategoryId };
};
