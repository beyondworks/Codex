import { aspectRatioToNumber, normalizeAspectRatio } from '../utils/aspectRatio';
import { ThemeSelection, buildMockupPrompt } from '../utils/promptBuilder';

export interface NanoBananaClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface TextToImageParams {
  prompt?: string;
  aspectRatio: string;
  theme: ThemeSelection;
  variations?: number;
}

export interface ImageToImageParams extends TextToImageParams {
  imageBase64: string;
  strength?: number;
}

export interface GeneratedAsset {
  id: string;
  url: string;
  thumbnailUrl?: string;
  providerResponse?: unknown;
}

interface NanoBananaResponseAsset {
  id?: string;
  url?: string;
  image_url?: string;
  imageUrl?: string;
  thumbnail_url?: string;
  thumbnailUrl?: string;
}

interface NanoBananaResponse {
  data?: NanoBananaResponseAsset[];
  result?: NanoBananaResponseAsset[];
  assets?: NanoBananaResponseAsset[];
  meta?: Record<string, unknown>;
}

export class NanoBananaClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor({ apiKey, baseUrl, timeoutMs = 60_000 }: NanoBananaClientOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl ?? 'https://api.nanobanana.ai/v1/mockup';
    this.timeoutMs = timeoutMs;
  }

  async generateTextToImage(params: TextToImageParams): Promise<GeneratedAsset[]> {
    this.ensureApiKey();
    const payload = this.buildTextToImagePayload(params);
    const response = await this.post('/text-to-image', payload);
    return this.normaliseResponse(response);
  }

  async generateImageToImage(params: ImageToImageParams): Promise<GeneratedAsset[]> {
    this.ensureApiKey();
    const payload = this.buildImageToImagePayload(params);
    const response = await this.post('/image-to-image', payload);
    return this.normaliseResponse(response);
  }

  private buildTextToImagePayload(params: TextToImageParams): Record<string, unknown> {
    const { prompt, theme, aspectRatio, variations = 1 } = params;
    const promptResult = buildMockupPrompt(prompt, theme);
    return {
      prompt: promptResult.prompt,
      aspect_ratio: normalizeAspectRatio(aspectRatio),
      aspect_ratio_value: aspectRatioToNumber(aspectRatio),
      variations,
      theme: {
        angle: theme.angle,
        mood: theme.mood,
        lighting: theme.lighting,
        interior: theme.interior,
      },
      meta: {
        applied: promptResult.appliedOptions.map((entry) => ({ type: entry.type, id: entry.option.id })),
      },
    };
  }

  private buildImageToImagePayload(params: ImageToImageParams): Record<string, unknown> {
    const basePayload = this.buildTextToImagePayload(params);
    return {
      ...basePayload,
      image: params.imageBase64,
      strength: params.strength ?? 0.65,
    };
  }

  private async post(path: string, body: unknown): Promise<NanoBananaResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorPayload = await response.text();
        throw new Error(`Nano Banana API error (${response.status}): ${errorPayload}`);
      }

      return (await response.json()) as NanoBananaResponse;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        throw new Error('Nano Banana API request timed out.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  private normaliseResponse(response: NanoBananaResponse): GeneratedAsset[] {
    const candidates = response.data ?? response.result ?? response.assets ?? [];
    return candidates
      .map((asset, index) => {
        const url = asset.url ?? asset.imageUrl ?? asset.image_url;
        const thumbnailUrl = asset.thumbnailUrl ?? asset.thumbnail_url;
        if (!url) {
          return undefined;
        }
        return {
          id: asset.id ?? `asset-${index}`,
          url,
          thumbnailUrl,
          providerResponse: response.meta,
        } satisfies GeneratedAsset;
      })
      .filter((asset): asset is GeneratedAsset => Boolean(asset));
  }

  private ensureApiKey(): void {
    if (!this.apiKey) {
      throw new Error('Nano Banana API key is not configured.');
    }
  }
}

export function createNanoBananaClientFromEnv(): NanoBananaClient {
  return new NanoBananaClient({
    apiKey: process.env.NANO_BANANA_API_KEY ?? '',
    baseUrl: process.env.NANO_BANANA_API_URL,
  });
}
