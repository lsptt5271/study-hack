import { QueryResolvers } from '@/graphqls/resolvers/type';
import studyProvider from '@/providers/study';

export const studiesQueryResolver: QueryResolvers['studies'] = async () => {
  const { findAll } = studyProvider();

  return await findAll();
};
