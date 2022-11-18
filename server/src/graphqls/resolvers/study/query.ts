import exception from '@/graphqls/exception';
import { QueryResolvers } from '@/graphqls/resolvers/type';
import { getStudiesForUser } from '@/services/study';

export const studiesQueryResolver: QueryResolvers['studies'] = async (source, args, context) => {
  if (!context.user) throw exception('Unauthorized!');

  return getStudiesForUser(args.input, context.user);
};
