import { Router } from 'express';
import { z } from 'zod';
import { storagePaths } from '../config/storage';
import { ensureWithinDirectory, readFileAsBase64 } from '../utils/fileSystem';
import { NanoBananaClient } from '../services/nanoBananaClient';

const baseSchema = z.object({
  prompt: z.string().optional(),
  aspectRatio: z.string().regex(/^[0-9]+:[0-9]+$/, 'Aspect ratio must be formatted like 16:9'),
  angle: z.string().optional(),
  mood: z.string().optional(),
  lighting: z.string().optional(),
  interior: z.string().optional(),
  variations: z.number().int().min(1).max(4).optional(),
});

const imageToImageSchema = baseSchema.extend({
  screenshotPath: z.string(),
  strength: z.number().min(0).max(1).optional(),
});

export function createMockupRouter(client: NanoBananaClient): Router {
  const router = Router();

  router.post('/text-to-image', async (req, res) => {
    const parsed = baseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { prompt, angle, mood, lighting, interior, aspectRatio, variations } = parsed.data;

    try {
      const assets = await client.generateTextToImage({
        prompt,
        aspectRatio,
        variations,
        theme: { angle, mood, lighting, interior },
      });
      return res.json({ assets });
    } catch (error) {
      return res.status(502).json({ error: (error as Error).message });
    }
  });

  router.post('/image-to-image', async (req, res) => {
    const parsed = imageToImageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { prompt, angle, mood, lighting, interior, aspectRatio, screenshotPath, strength, variations } = parsed.data;

    try {
      const absolute = ensureWithinDirectory(storagePaths.root, screenshotPath);
      const imageBase64 = await readFileAsBase64(absolute);
      const assets = await client.generateImageToImage({
        prompt,
        aspectRatio,
        imageBase64: `data:image/png;base64,${imageBase64}`,
        strength,
        variations,
        theme: { angle, mood, lighting, interior },
      });
      return res.json({ assets });
    } catch (error) {
      return res.status(502).json({ error: (error as Error).message });
    }
  });

  return router;
}
