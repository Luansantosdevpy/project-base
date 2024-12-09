import { inject, injectable } from 'tsyringe';

import type HealthCheckRepositoryInterface from '../../domain/interfaces/repositories/healthCheckRepositoryInterface';
import Logger from '../../infrastructure/log/logger';

@injectable()
export default class HealthCheckService {
  constructor(
    @inject('HealthCheckRepositoryInterface')
    private readonly mongoHealthCheckRepository: HealthCheckRepositoryInterface
  ) {}

  public async checkStatusAPI() {
    Logger.debug('HealthCheckService - checkStatusAPI - Begin health checks');

    let mongoCheck = 'OK';
    try {
      mongoCheck = await this.mongoHealthCheckRepository.findStatus();
    } catch (error) {
      Logger.error('HealthCheckService - MongoDB check failed:', error);
      mongoCheck = 'ERROR';
    }

    const healthcheck = {
      name: 'Project base',
      status: mongoCheck === 'OK' ? 'OK' : 'ERROR',
      uptime: process.uptime(),
      timestamp: Date.now(),
      checks: [
        {
          name: 'Database',
          status: mongoCheck,
        },
      ],
    };

    Logger.debug('HealthCheckService - checkStatusAPI - Completed health checks');
    return healthcheck;
  }
}
