import 'reflect-metadata';
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';
import type { Server } from 'http';
import { container } from 'tsyringe';

import routes from './api/routes/routes';
import dependencyContainer from './dependencyContainer';
import { initializeDatabase } from './infrastructure/data/config/database';
import Logger from './infrastructure/log/logger';

export default class App {
  public express: express.Application = express();

  private server: Server;

  public async initialize(): Promise<void> {
    try {
      await this.connectToMongoDB();
      await this.setupDependencyInjection();
      this.setupMiddlewares();
      await this.setupRoutes();
      this.setupErrorHandling();
    } catch (error) {
      Logger.error('Error during app initialization:', error);
      process.exit(1);
    }
  }

  public start(port: number, appName: string): void {
    this.server = this.express.listen(port, '0.0.0.0', () => {
      Logger.info(`${appName} listening on port ${port}!`);
    });
  }

  public stop(): void {
    this.server.close(() => {
      Logger.info('Server stopped gracefully.');
    });
  }

  private async connectToMongoDB(): Promise<void> {
    try {
      await initializeDatabase();
      Logger.info('MongoDB connection established');
    } catch (error) {
      Logger.error('Error during MongoDB connection:', error);
      throw error;
    }
  }

  private async setupDependencyInjection(): Promise<void> {
    await dependencyContainer(container);
  }

  private setupMiddlewares(): void {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*',
        methods: 'POST, GET, PUT, OPTIONS, PATCH, DELETE',
        exposedHeaders: 'X-file-name',
      })
    );
  }

  private async setupRoutes(): Promise<void> {
    const router = await routes();
    this.express.use(router);
  }

  private setupErrorHandling(): void {
    this.express.use((err: Error, req: Request, res: Response) => {
      Logger.error('Unhandled error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}
