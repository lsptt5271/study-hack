import { graphqlHTTP } from 'express-graphql';
import passport from 'passport';

import schema from '@/graphqls/schema';
import context from '@/graphqls/context';
import { JwtPayload } from '@/@types';

export default graphqlHTTP((req, res) => {
  return new Promise<JwtPayload | null>((resolve) => {
    passport.authenticate('jwt', { session: false }, (error, payload, info) => {
      if (error) resolve(null);
      if (payload) resolve(payload);
      else resolve(null);
    })(req, res);
  }).then((payload) => ({
    schema: schema,
    context: context(payload?.user || null),
    graphiql: true,
  }));
});
