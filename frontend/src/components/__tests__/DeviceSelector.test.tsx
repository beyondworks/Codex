import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DeviceSelector } from '../DeviceSelector';
import type { DeviceProfile } from '../../types';

const DEVICES: DeviceProfile[] = [
  {
    id: 'desktop',
    label: 'Desktop',
    width: 1440,
    height: 900,
    pixelRatio: 1,
    category: 'desktop',
    description: 'Desktop viewport',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    width: 375,
    height: 812,
    pixelRatio: 3,
    category: 'mobile',
    description: 'Mobile viewport',
  },
];

describe('DeviceSelector', () => {
  it('renders device options and triggers callback', async () => {
    const onSelect = vi.fn();
    render(<DeviceSelector devices={DEVICES} selectedId="desktop" onSelect={onSelect} />);

    const mobileButton = screen.getByRole('button', { name: /mobile/i });
    await userEvent.click(mobileButton);

    expect(onSelect).toHaveBeenCalledWith('mobile');
  });
});
