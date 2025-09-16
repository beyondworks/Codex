import type {
  CaptureRequest,
  CaptureResponse,
  ImageToImageRequest,
  MockupAsset,
  MockupGenerationRequest,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

async function request<T>(path: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      const message = await extractErrorMessage(response);
      throw new Error(message);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || '요청 처리 중 문제가 발생했습니다.');
    }
    throw new Error('요청 처리 중 문제가 발생했습니다.');
  }
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data === 'object' && data && 'error' in data) {
      const errorValue = data.error;
      if (typeof errorValue === 'string') {
        return errorValue;
      }
      if (typeof errorValue === 'object' && errorValue !== null && 'message' in errorValue) {
        return String(errorValue.message);
      }
    }
    return `요청이 실패했습니다. (status: ${response.status})`;
  } catch {
    return `요청이 실패했습니다. (status: ${response.status})`;
  }
}

export async function captureScreenshot(payload: CaptureRequest): Promise<CaptureResponse> {
  return request<CaptureResponse>('/capture', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

interface MockupResponse {
  assets: MockupAsset[];
}

export async function generateTextMockups(payload: MockupGenerationRequest): Promise<MockupAsset[]> {
  const result = await request<MockupResponse>('/mockups/text-to-image', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return result.assets;
}

export async function generateImageMockups(payload: ImageToImageRequest): Promise<MockupAsset[]> {
  const result = await request<MockupResponse>('/mockups/image-to-image', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return result.assets;
}
