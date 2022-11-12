import exception from '@/graphqls/exception';
import { MutationResolvers } from '../type';
import { createMenuForUser, deleteMenuForUser } from '@/services/menu';
import logger from '@/commons/logger';

export const createMenuMutation: MutationResolvers['createMenu'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return createMenuForUser(args.input, context.user)
    .then(() => true)
    .catch((e) => {
      logger.system.error(e);
      return false;
    });
};

export const deleteMenuMutation: MutationResolvers['deleteMenu'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return deleteMenuForUser(args.input, context.user)
    .then(() => true)
    .catch((e) => {
      logger.system.error(e);
      return false;
    });
};
