import { injectable } from 'tsyringe';
import HealthCheckRepositoryInterface from '../../../domain/interfaces/repositories/healthCheckRepositoryInterface';
import Logger from '../../log/logger';

@injectable()
export default class HealthCheckRepository
  implements HealthCheckRepositoryInterface
{
  constructor() {}

  public async findStatus() {
    Logger.debug('healthCheckRepository - findStatus - sequelize');
    try {
      return 'Ok';
    } catch (error) {
      return 'ERROR';
    }
  }
}
