import { Router } from 'express';

import passport from '@/auths/index';
import { sign } from '@/auths/jwt';
import { JwtPayload, User } from '@/@types';
import { isExistUser } from '@/services/user';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', {
    session: false,
  }),
  (req, res, next) => {
    res.json({ ...sign(req.user as User) });
  }
);

router.post('/auth', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const auth = req.user as JwtPayload;
  res.json(auth);
});

router.post('/validate-signup', (req, res, next) => {
  (async () => {
    const userExistance = await isExistUser(req.body.loginId);
    res.status(200).send(userExistance);
  })().catch(next);
});

export default router;
