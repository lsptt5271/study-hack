import { CreateMenuInput, DeleteMenuInput } from '@/graphqls/resolvers/type';
import client from '@/providers/client';

const menuProvider = () => {
  const create = async (data: CreateMenuInput & { imageName?: string; imageContentType?: string }) => {
    return await client.menu.create({
      data: {
        name: data.name,
        category_id: data.categoryId,
        image: data.imageName,
        image_content_type: data.imageContentType,
      },
    });
  };

  const remove = async (data: DeleteMenuInput) => {
    return await client.menu.delete({
      where: {
        id: data.menuId,
      },
    });
  };

  const findByCategoryId = async (categoryId: number) => {
    return await client.menu.findMany({
      where: {
        category_id: categoryId,
      },
    });
  };

  const findOneById = (id: number) => {
    return client.menu.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  };

  return { create, remove, findOneById, findByCategoryId };
};

export default menuProvider;
