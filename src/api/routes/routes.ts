import { Router } from 'express';

import v1 from './v1/v1';

export default async (): Promise<Router> => {
  const router = Router();

  router.use(await v1());

  return router;
};
