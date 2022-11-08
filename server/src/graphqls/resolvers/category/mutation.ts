import categoryProvider from '@/providers/category';
import { MutationResolvers } from '../type';

import exception from '@/graphqls/exception';

export const createCategoryMutation: MutationResolvers['createCategory'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  const { create } = categoryProvider();

  return await create(args.input, context.user);
};
