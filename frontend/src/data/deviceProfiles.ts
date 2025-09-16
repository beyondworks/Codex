import type { DeviceProfile } from '../types';

export const DEVICE_OPTIONS: DeviceProfile[] = [
  {
    id: 'iphone-15-pro',
    label: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    pixelRatio: 3,
    category: 'mobile',
    description: '최신 플래그십 스마트폰의 세로형 뷰포트.',
  },
  {
    id: 'android-large',
    label: 'Android Large',
    width: 412,
    height: 915,
    pixelRatio: 3,
    category: 'mobile',
    description: '안드로이드 대화면 디바이스를 대표하는 해상도.',
  },
  {
    id: 'ipad-air',
    label: 'iPad Air',
    width: 820,
    height: 1180,
    pixelRatio: 2,
    category: 'tablet',
    description: '태블릿 포트레이트 레이아웃 테스트에 적합.',
  },
  {
    id: 'desktop-1440',
    label: 'Desktop 1440px',
    width: 1440,
    height: 900,
    pixelRatio: 1,
    category: 'desktop',
    description: '랜딩 페이지 디자인에서 가장 널리 쓰이는 데스크탑 해상도.',
  },
  {
    id: 'desktop-ultrawide',
    label: 'Desktop Ultrawide',
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    category: 'desktop',
    description: '풀 HD 모니터에 대응하는 와이드 구도.',
  },
];

export const DEFAULT_DEVICE_ID = 'desktop-1440';
