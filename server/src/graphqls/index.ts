import { graphqlHTTP } from 'express-graphql';

import schema from '@/graphqls/schema';
import context from '@/graphqls/context';

export default graphqlHTTP((req) => {
  return {
    schema: schema,
    context: context(),
    graphiql: true,
  };
});
