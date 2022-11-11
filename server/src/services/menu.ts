import { randomUUID } from 'crypto';
import { createWriteStream, existsSync, mkdirSync, readFileSync } from 'fs';

import { User } from '@/@types';
import configs from '@/configs';
import { MenuModel } from '@/graphqls/model';
import { CreateMenuInput, DeleteMenuInput } from '@/graphqls/resolvers/type';
import menuProvider from '@/providers/menu';
import { Menu } from '@prisma/client';
import categoryProvider from '@/providers/category';
import exception from '@/graphqls/exception';
import path from 'path';

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
      const parentDir = path.join(configs.image_dir, user.id.toString());
      if (!existsSync(parentDir)) {
        mkdirSync(parentDir);
      }
      const ws = createWriteStream(path.join(configs.image_dir, user.id.toString(), imageName), 'utf-8');
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
  const { findOneByIdWithCategory, remove } = menuProvider();
  if ((await findOneByIdWithCategory(input.menuId))?.category.user_id === user.id) {
    return remove(input);
  } else {
    throw exception('Forbbiden!');
  }
};

export const getMenuImage = async (menuId: number, user: User) => {
  const { findOneById } = menuProvider();
  const menu = await findOneById(menuId);

  if (!menu || !menu.image || !menu.image_content_type) return null;

  return {
    buffer: readFileSync(path.join(configs.image_dir, user.id.toString(), menu.image)),
    contentType: menu.image_content_type,
  };
};

const convert = (entity: Menu): MenuModel => ({
  id: entity.id,
  name: entity.name,
  categoryId: entity.category_id,
});
