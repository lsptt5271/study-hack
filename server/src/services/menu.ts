import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';

import { User } from '@/@types';
import configs from '@/configs';
import { MenuModel } from '@/graphqls/model';
import { CreateMenuInput, DeleteMenuInput } from '@/graphqls/resolvers/type';
import menuProvider from '@/providers/menu';
import { Menu } from '@prisma/client';
import categoryProvider from '@/providers/category';
import exception from '@/graphqls/exception';

export const getMenusByCategoryId = async (categoryId: number) => {
  const { findByCategoryId } = menuProvider();

  return (await findByCategoryId(categoryId)).map((e) => convert(e));
};

export const createMenuForUser = async (input: CreateMenuInput, user: User) => {
  const { create } = menuProvider();
  const { findOneById } = categoryProvider();

  if ((await findOneById(input.categoryId))?.user_id === user.id) {
    if (input.image?.file) {
      const imageName = randomUUID();
      const rs = input.image.file.createReadStream();
      const ws = createWriteStream(`${configs.image_dir}/${user}/${imageName}`, 'utf-8');
      rs.pipe(ws);

      return await create({ ...input, imageName, imageContentType: input.image.file.mimetype });
    } else {
      return await create(input);
    }
  } else {
    throw exception('Forbbiden!');
  }
};

export const deleteMenuForUser = async (input: DeleteMenuInput, user: User) => {
  const { findOneById, remove } = menuProvider();
  if ((await findOneById(input.menuId))?.category.user_id === user.id) {
    return remove(input);
  } else {
    throw exception('Forbbiden!');
  }
};

const convert = (entity: Menu): MenuModel => ({
  id: entity.id,
  name: entity.name,
  categoryId: entity.category_id,
});
