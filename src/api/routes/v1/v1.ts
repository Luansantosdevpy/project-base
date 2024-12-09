import { Router } from 'express';

import healthcheck from './healthcheck';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/v1', router);
  router.use('/health-check', await healthcheck());
  return router;
};
