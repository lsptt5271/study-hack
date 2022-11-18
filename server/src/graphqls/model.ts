export type StudyModel = {
  id: number;
  memo: string;
  startAt: string;
  endAt: string;
  menuId: number;
  createdAt: string;
};

export type CategoryModel = {
  id: number;
  name: string;
  userId: number;
};

export type MenuModel = {
  id: number;
  name: string;
  categoryId: number;
};
