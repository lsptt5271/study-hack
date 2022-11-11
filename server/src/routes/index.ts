import { Router } from 'express';

import logger from '@/commons/logger';
import authRouter from '@/routes/auth';
import imageRouter from '@/routes/image';

const router = Router();

router.use((req, res, next) => {
  let log: string = `[${req.method}][${req.url}]`;
  if (Object.keys(req.query).length !== 0) {
    log += '\n' + JSON.stringify(req.query);
  }
  logger.system.info(log);
  next();
});

router.use(authRouter);
router.use(imageRouter);

export default router;
