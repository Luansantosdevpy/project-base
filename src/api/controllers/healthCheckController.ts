import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import HealthCheckService from '../../application/services/healthCheckService';
import Logger from '../../infrastructure/log/logger';

export default class HealthCheckController {
  public async getStatusAPI(request: Request, response: Response): Promise<void> {
    try {
      Logger.debug('HealthCheckController - getStatusAPI - Request Received');
      const healthCheckService = container.resolve(HealthCheckService);
      const result = await healthCheckService.checkStatusAPI();
      response.status(200).json({ data: result });
    } catch (error) {
      Logger.error('HealthCheckController - Error occurred:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
