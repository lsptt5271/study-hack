import express from 'express';
import http from 'http';
import path from 'path';

import passport from '@/auths';
import config from '@/configs';
import logger from '@/commons/logger';
import graphql from '@/graphqls';
import errorHandler from '@/middlewares/error-handler';
import router from '@/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(logger.express);

const contextPath = process.env.CONTEXT_PATH || config.context_path || 'express-graphql';

app.use(contextPath, express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');

  if (req.method === 'OPTIONS') {
    res.status(200);
    res.end();
  } else {
    next();
  }
});

app.use(contextPath, router);

app.use(`${contextPath}graphql`, graphql);

app.use(errorHandler.notfound);
app.use(errorHandler.error);

app.set('trust proxy', 'loopback');

const port = process.env.PORT || config.server_port || 3000;
const server = http.createServer(app);
server.listen(port);

server.on('error', (error: Error & { syscall?: string; code?: string }) => {
  logger.system.error(error);
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
  switch (error.code) {
    case 'EACCES':
      logger.access.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.access.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port || 3000}`;
  logger.system.info(`Listening on ${bind}`);
});

export default app;
