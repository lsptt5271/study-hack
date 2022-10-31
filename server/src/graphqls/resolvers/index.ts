import { Resolvers } from '@/graphqls/resolvers/type';
import { studiesQueryResolver } from '@/graphqls/resolvers/study/query';
import { createUserMutationResolver } from '@/graphqls/resolvers/user/mutation';

const resolver: Resolvers = {
  Query: {
    studies: studiesQueryResolver,
  },
  Mutation: {
    createUser: createUserMutationResolver,
  },
};

export default resolver;
