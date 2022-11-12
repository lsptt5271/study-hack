import { Resolvers } from '@/graphqls/resolvers/type';
import { studiesQueryResolver } from '@/graphqls/resolvers/study/query';
import { createUserMutationResolver } from '@/graphqls/resolvers/user/mutation';
import { createCategoryMutation, deleteCategoryMutation } from './category/mutation';
import { categoriesQueryResolver } from './category/query';
import categoryFieldResolvers from './category/field';
import { createMenuMutation, deleteMenuMutation } from './menu/mutation';

const resolver: Resolvers = {
  Category: categoryFieldResolvers,
  Query: {
    studies: studiesQueryResolver,
    categories: categoriesQueryResolver,
  },
  Mutation: {
    createCategory: createCategoryMutation,
    deleteCategory: deleteCategoryMutation,
    createMenu: createMenuMutation,
    deleteMenu: deleteMenuMutation,
    createUser: createUserMutationResolver,
  },
};

export default resolver;
