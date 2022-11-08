import { User } from '@/@types';
import { CreateCategoryInput } from '@/graphqls/resolvers/type';
import client from '@/providers/client';

const categoryProvider = () => {
  const create = async (data: CreateCategoryInput, user: User) => {
    return await client.category.create({
      data: {
        name: data.name,
        user_id: user.id,
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

  return { create, findByUserId };
};

export default categoryProvider;
