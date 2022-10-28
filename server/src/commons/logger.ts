import log4js from 'log4js';

import config from '@/configs/index';

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      filename: `${config.log_dir}/access.log`,
      pattern: '-yyyy-MM-dd',
      backups: 7,
    },
    system: {
      type: 'dateFile',
      filename: `${config.log_dir}/system.log`,
      pattern: '-yyyy-MM-dd',
      backups: 7,
    },
    output: {
      type: 'console',
    },
  },
  categories: {
    default: { appenders: ['output'], level: 'info' },
    access: { appenders: ['access'], level: 'all' },
    system: { appenders: ['system', 'output'], level: 'all' },
  },
});
export default {
  access: log4js.getLogger('access'),
  system: log4js.getLogger('system'),
  express: log4js.connectLogger(log4js.getLogger('access'), {
    level: 'info',
  }),
};
