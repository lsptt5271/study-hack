import { User } from '@/@types';
import { CategoryModel } from '@/graphqls/model';
import categoryProvider from '@/providers/category';

export const getCategoriesForUser = async (user: User): Promise<CategoryModel[]> => {
  const { findByUserId } = categoryProvider();

  return (await findByUserId(user.id)).map((e) => ({
    id: e.id,
    name: e.name,
    userId: e.user_id,
  }));
};
