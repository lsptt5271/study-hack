import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from '@/graphqls/type-defs';
import resolver from '@/graphqls/resolvers/index';

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolver,
});
