import { Router } from 'express';
import { listDeviceProfiles } from '../config/deviceProfiles';

export function createDeviceRouter(): Router {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({ devices: listDeviceProfiles() });
  });

  return router;
}
