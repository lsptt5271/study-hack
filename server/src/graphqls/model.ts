export type StudyModel = {
  id: number;
  name: string;
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
