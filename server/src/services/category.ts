import { User } from '@/@types';
import exception from '@/graphqls/exception';
import { CategoryModel } from '@/graphqls/model';
import { CreateCategoryInput, DeleteCategoryInput } from '@/graphqls/resolvers/type';
import categoryProvider from '@/providers/category';
import { Category } from '@prisma/client';

export const getCategoriesForUser = async (user: User): Promise<CategoryModel[]> => {
  const { findByUserId } = categoryProvider();

  return (await findByUserId(user.id)).map((e) => convert(e));
};

export const createCategoryForUser = async (input: CreateCategoryInput, user: User) => {
  const { create } = categoryProvider();

  return await create(input, user.id);
};

export const deleteCategoryForUser = async (input: DeleteCategoryInput, user: User) => {
  const { findOneById, remove } = categoryProvider();
  if ((await findOneById(input.categoryId))?.user_id === user.id) {
    return remove(input);
  } else {
    throw exception('Forbbiden!');
  }
};

const convert = (entity: Category): CategoryModel => ({
  id: entity.id,
  name: entity.name,
  userId: entity.user_id,
});
