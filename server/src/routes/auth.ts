import { Router } from 'express';

import passport from '@/auths/index';
import { sign } from '@/auths/jwt';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', {
    session: false,
  }),
  (req, res, next) => {
    res.json({ ...sign(req.user) });
  }
);

router.post('/auth', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const auth = req.user;
  res.json(auth);
});

export default router;
