import { Router } from 'express';
import { container } from 'tsyringe';

import HealthCheckController from '../../controllers/healthCheckController';

export default async (): Promise<Router> => {
  const router = Router();
  const healthController = container.resolve(HealthCheckController);

  router.get('/', healthController.getStatusAPI);

  return router;
};
