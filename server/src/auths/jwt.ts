import jwt from 'jsonwebtoken';

import config from '@/configs';
import { User } from '@/@types';

export const sign = (user: User) => {
  const payload = { user };
  const exp = Math.floor(Date.now() / 1000) + config.jwt_max_age;

  return {
    token: jwt.sign(
      {
        ...payload,
        exp,
      },
      config.jwt_secret_key
    ),
    user,
    exp,
  };
};
