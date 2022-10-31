import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import bcrypt from 'bcrypt';

import config from '@/configs';
import userProvider from '@/providers/user';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      const { findOneByLoginId } = userProvider();
      const user = await findOneByLoginId(username);

      if (!user || !bcrypt.compareSync(password, user.login_password)) {
        return done(null, false);
      } else {
        return done(null, {
          name: user.name,
          loginId: user.login_id,
        });
      }
    }
  )
);

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret_key,
};

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
  })
);

export default passport;
