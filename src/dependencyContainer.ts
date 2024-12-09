import type { DependencyContainer } from 'tsyringe';

import HealthCheckService from './application/services/healthCheckService';
import type HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import HealthCheckRepository from './infrastructure/data/repositories/healthCheckRepository';
import Logger from './infrastructure/log/logger';

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Dependency container initializing...');

  container.register<HealthCheckRepositoryInterface>(
    'HealthCheckRepositoryInterface',
    {
      useClass: HealthCheckRepository
    }
  );

  container.register<HealthCheckService>('HealthCheckService', {
    useClass: HealthCheckService
  });

  Logger.debug('Dependency container initialized!');
};
