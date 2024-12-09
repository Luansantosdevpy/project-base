import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import type HealthCheckRepositoryInterface from '../../../domain/interfaces/repositories/healthCheckRepositoryInterface';
import Logger from '../../log/logger';

@injectable()
export default class HealthCheckRepository
  implements HealthCheckRepositoryInterface
{
  public async findStatus(): Promise<string> {
    Logger.debug('HealthCheckRepository - findStatus - Checking MongoDB connection');
    try {
      if (mongoose.connection.readyState !== 1) {
        Logger.error('MongoDB is not connected');
        return 'ERROR';
      }

      const db = mongoose.connection.db;
      if (!db) {
        Logger.error('MongoDB connection is undefined');
        return 'ERROR';
      }

      const admin = db.admin();
      await admin.ping();
      Logger.debug('MongoDB is healthy');
      return 'OK';
    } catch (error) {
      Logger.error('Error checking MongoDB health:', error);
      return 'ERROR';
    }
  }
}
