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

const deviceProfiles: DeviceProfile[] = [
  {
    id: 'iphone-15-pro',
    label: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    pixelRatio: 3,
    category: 'mobile',
    description: 'High-density flagship smartphone viewport.',
  },
  {
    id: 'android-large',
    label: 'Android Large (Pixel 8 Pro)',
    width: 412,
    height: 915,
    pixelRatio: 3,
    category: 'mobile',
    description: 'Tall Android viewport representative of modern devices.',
  },
  {
    id: 'ipad-air',
    label: 'iPad Air Portrait',
    width: 820,
    height: 1180,
    pixelRatio: 2,
    category: 'tablet',
    description: 'Tablet sized layout ideal for mid-sized viewports.',
  },
  {
    id: 'desktop-1440',
    label: 'Desktop 1440px',
    width: 1440,
    height: 900,
    pixelRatio: 1,
    category: 'desktop',
    description: 'Common large desktop viewport for marketing sites.',
  },
  {
    id: 'desktop-ultrawide',
    label: 'Desktop Ultrawide',
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    category: 'desktop',
    description: 'Full HD layout suited to hero sections and dashboards.',
  },
];

export function listDeviceProfiles(): DeviceProfile[] {
  return deviceProfiles;
}

export function getDeviceProfile(id: string): DeviceProfile | undefined {
  return deviceProfiles.find((profile) => profile.id === id);
}

export function resolveDimensions(
  preferredId: string | undefined,
  fallbackWidth: number | undefined,
  fallbackHeight: number | undefined,
): { profile: DeviceProfile; width: number; height: number } {
  const defaultProfile = deviceProfiles.find((profile) => profile.id === 'desktop-1440') ?? deviceProfiles[0];
  if (!preferredId) {
    return {
      profile: defaultProfile,
      width: fallbackWidth ?? defaultProfile.width,
      height: fallbackHeight ?? defaultProfile.height,
    };
  }

  const profile = getDeviceProfile(preferredId);
  if (!profile) {
    return {
      profile: defaultProfile,
      width: fallbackWidth ?? defaultProfile.width,
      height: fallbackHeight ?? defaultProfile.height,
    };
  }

  return {
    profile,
    width: fallbackWidth ?? profile.width,
    height: fallbackHeight ?? profile.height,
  };
}
