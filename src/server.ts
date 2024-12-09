import 'reflect-metadata';
import * as dotenv from 'dotenv';

import App from './app';
import Logger from './infrastructure/log/logger';

dotenv.config();

const run = async () => {
  try {
    const api = new App();
    const appName = process.env.APP_NAME || 'App';
    const port = parseInt(process.env.APP_PORT || '8000', 10);

    await api.initialize();
    api.start(port, appName);

    process.on('SIGINT', async () => {
      Logger.info('Graceful shutdown initiated');
      api.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      Logger.info('Graceful shutdown initiated');
      api.stop();
      process.exit(0);
    });
  } catch (error) {
    Logger.error('Error starting the server:', error);
    process.exit(1);
  }
};

run();
