import { CategoryResolvers } from '@/graphqls/resolvers/type';

const categoryFieldResolvers: CategoryResolvers = {
  menus: (source, args, context) => {
    return context.loader.getMenusByCategoryIdDataLoader.load(source.id);
  },
};

export default categoryFieldResolvers;
