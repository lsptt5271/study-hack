import exception from '@/graphqls/exception';
import { getCategoriesForUser } from '@/services/category';
import { QueryResolvers } from '../type';

export const categoriesQueryResolver: QueryResolvers['categories'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return await getCategoriesForUser(context.user);
};
