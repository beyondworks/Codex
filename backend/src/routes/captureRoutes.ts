import { Router } from 'express';
import { z } from 'zod';
import { capturePage } from '../services/captureService';
import { resolveDimensions } from '../config/deviceProfiles';
import { isSafeHttpUrl } from '../utils/urlSafety';

const captureSchema = z.object({
  url: z.string(),
  deviceId: z.string().optional(),
  width: z.number().int().min(320).max(3840).optional(),
  height: z.number().int().min(480).max(4320).optional(),
  fullPage: z.boolean().optional(),
});

export function createCaptureRouter(): Router {
  const router = Router();

  router.post('/', async (req, res) => {
    const parsed = captureSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { url, deviceId, width, height, fullPage } = parsed.data;
    if (!isSafeHttpUrl(url)) {
      return res.status(400).json({ error: 'URL must be http(s) and cannot target private networks.' });
    }

    const { profile, width: resolvedWidth, height: resolvedHeight } = resolveDimensions(deviceId, width, height);

    try {
      const result = await capturePage({
        url,
        width: resolvedWidth,
        height: resolvedHeight,
        device: profile,
        fullPage: fullPage ?? true,
      });

      const normalizedPath = result.relativePath.split('\\').join('/');

      return res.json({
        screenshotUrl: `/media/${normalizedPath}`,
        screenshotPath: normalizedPath,
        width: result.width,
        height: result.height,
        device: profile,
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  });

  return router;
}
