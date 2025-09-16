import { describe, expect, it } from 'vitest';
import { buildMockupPrompt } from '../src/utils/promptBuilder';

describe('buildMockupPrompt', () => {
  it('combines base prompt with selected themes', () => {
    const result = buildMockupPrompt('Design a fintech landing page', {
      angle: 'isometric',
      mood: 'minimal',
      lighting: 'studio',
      interior: 'workspace',
    });

    expect(result.prompt).toContain('Design a fintech landing page');
    expect(result.appliedOptions).toHaveLength(4);
  });

  it('falls back to default when base prompt missing', () => {
    const result = buildMockupPrompt('', {});
    expect(result.prompt).toContain('High-fidelity homepage hero mockup');
    expect(result.appliedOptions).toHaveLength(0);
  });
});
