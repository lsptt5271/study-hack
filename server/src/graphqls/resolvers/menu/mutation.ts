import exception from '@/graphqls/exception';
import { MutationResolvers } from '../type';
import { createMenuForUser } from '@/services/menu';
import logger from '@/commons/logger';

export const createMenuMutation: MutationResolvers['createMenu'] = (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return createMenuForUser(args.input, context.user)
    .then(() => true)
    .catch((e) => {
      logger.system.error(e);
      return false;
    });
};
