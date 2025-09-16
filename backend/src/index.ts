import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import { createCaptureRouter } from './routes/captureRoutes';
import { createDeviceRouter } from './routes/deviceRoutes';
import { createMockupRouter } from './routes/mockupRoutes';
import { ensureStorageStructure, storagePaths } from './config/storage';
import { createNanoBananaClientFromEnv } from './services/nanoBananaClient';

dotenv.config();

export function createApp(): Application {
  ensureStorageStructure();
  const app = express();

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : undefined,
    }),
  );
  app.use(express.json({ limit: '20mb' }));
  app.use(morgan('dev'));
  app.use('/media', express.static(storagePaths.root));

  const nanoBananaClient = createNanoBananaClientFromEnv();

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/devices', createDeviceRouter());
  app.use('/api/capture', createCaptureRouter());
  app.use('/api/mockups', createMockupRouter(nanoBananaClient));

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 4000;
  const app = createApp();
  app.listen(port, () => {
    console.log(`Mockup service listening on port ${port}`);
  });
}
