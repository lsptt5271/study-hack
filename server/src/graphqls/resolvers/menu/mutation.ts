import { createWriteStream } from 'fs';
import { randomUUID } from 'crypto';

import configs from '@/configs';
import exception from '@/graphqls/exception';
import { MutationResolvers } from '../type';

export const createMenuMutation: MutationResolvers['createMenu'] = (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return true;
};
