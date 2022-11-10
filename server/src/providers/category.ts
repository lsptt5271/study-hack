import { CreateCategoryInput, DeleteCategoryInput } from '@/graphqls/resolvers/type';
import client from '@/providers/client';

const categoryProvider = () => {
  const create = async (data: CreateCategoryInput, userId: number) => {
    return await client.category.create({
      data: {
        name: data.name,
        user_id: userId,
      },
    });
  };

  const remove = async (data: DeleteCategoryInput) => {
    return await client.category.delete({
      where: {
        id: data.categoryId,
      },
    });
  };

  const findOneById = async (id: number) => {
    return await client.category.findUnique({
      where: {
        id: id,
      },
    });
  };

  const findByUserId = async (userId: number) => {
    return await client.category.findMany({
      where: {
        user_id: userId,
      },
    });
  };

  return { create, remove, findOneById, findByUserId };
};

export default categoryProvider;
