import { Resolvers } from '@/graphqls/resolvers/type';
import { studiesQueryResolver } from '@/graphqls/resolvers/study/query';
import { createUserMutationResolver } from '@/graphqls/resolvers/user/mutation';
import { createCategoryMutation } from './category/mutation';
import { categoriesQueryResolver } from './category/query';

const resolver: Resolvers = {
  Query: {
    studies: studiesQueryResolver,
    categories: categoriesQueryResolver,
  },
  Mutation: {
    createCategory: createCategoryMutation,
    createUser: createUserMutationResolver,
  },
};

export default resolver;
