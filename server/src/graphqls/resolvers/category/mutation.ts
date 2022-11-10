import { MutationResolvers } from '@/graphqls/resolvers/type';
import exception from '@/graphqls/exception';
import { createCategoryForUser, deleteCategoryForUser } from '@/services/category';
import logger from '@/commons/logger';

export const createCategoryMutation: MutationResolvers['createCategory'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return createCategoryForUser(args.input, context.user)
    .then(() => true)
    .catch((e) => {
      logger.system.error(e);
      return false;
    });
};

export const deleteCategoryMutation: MutationResolvers['deleteCategory'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return deleteCategoryForUser(args.input, context.user)
    .then(() => true)
    .catch((e) => {
      logger.system.error(e);
      return false;
    });
};
