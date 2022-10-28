import { Resolvers } from '@/graphqls/resolvers/type';
import { studiesQueryResolver } from '@/graphqls/resolvers/study/query';

const resolver: Resolvers = {
  Query: {
    studies: studiesQueryResolver,
  },
};

export default resolver;
