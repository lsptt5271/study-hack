import express from 'express';

import logger from '@/commons/logger';

const error = (err: any, req: express.Request, res: express.Response, next: Function) => {
  logger.system.error(err);

  res.status(err.status || 500);
  res.end();
};

const notfound = (req: express.Request, res: express.Response, next: Function) => {
  next({ status: 404 });
};

export default {
  error: error,
  notfound: notfound,
};
