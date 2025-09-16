export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';

export interface DeviceProfile {
  id: string;
  label: string;
  width: number;
  height: number;
  pixelRatio: number;
  category: DeviceCategory;
  description: string;
}

export interface CaptureRequest {
  url: string;
  deviceId?: string;
  width?: number;
  height?: number;
  fullPage?: boolean;
}

export interface CaptureResponse {
  screenshotUrl: string;
  screenshotPath: string;
  width: number;
  height: number;
  device: DeviceProfile;
}

export interface ThemeSelection {
  angle?: string;
  mood?: string;
  lighting?: string;
  interior?: string;
}

export interface MockupGenerationRequest extends ThemeSelection {
  prompt?: string;
  aspectRatio: string;
  variations?: number;
}

export interface ImageToImageRequest extends MockupGenerationRequest {
  screenshotPath: string;
  strength?: number;
}

export interface MockupAsset {
  id: string;
  url: string;
  thumbnailUrl?: string;
  providerResponse?: unknown;
}
