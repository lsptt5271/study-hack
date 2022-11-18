import dayjs from 'dayjs';

import { User } from '@/@types';
import exception from '@/graphqls/exception';
import { StudyModel } from '@/graphqls/model';
import { GetStudiesInput } from '@/graphqls/resolvers/type';
import menuProvider from '@/providers/menu';
import studyProvider from '@/providers/study';
import { Study } from '@prisma/client';
import { date2String } from '@/utils/date-converter';

export const getStudiesForUser = async (input: GetStudiesInput, user: User) => {
  const { findByIdsInWithCategory } = menuProvider();
  const { findByMenuIdsInAndStartAtAndEndAt } = studyProvider();

  const menus = await findByIdsInWithCategory(input.menuIds);
  let fobbiden = false;
  for (const menu of menus) {
    if (menu.category.user_id !== user.id) {
      fobbiden = true;
      break;
    }
  }

  if (fobbiden) {
    throw exception('Forbbiden!');
  } else {
    return (await findByMenuIdsInAndStartAtAndEndAt(input)).map((e) => convert(e));
  }
};

const convert = (entity: Study): StudyModel => {
  return {
    id: entity.id,
    memo: entity.memo,
    startAt: date2String(entity.start_at),
    endAt: date2String(entity.end_at),
    createdAt: date2String(entity.created_at),
    menuId: entity.menu_id,
  };
};
