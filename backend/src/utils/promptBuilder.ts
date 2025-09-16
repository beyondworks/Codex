import { cameraAngles, interiorStyles, lightingStyles, moodStyles, ThemeOption, findThemeOption } from '../config/themes';

export interface ThemeSelection {
  angle?: string;
  mood?: string;
  lighting?: string;
  interior?: string;
}

export interface PromptBuildResult {
  prompt: string;
  appliedOptions: Array<{ type: keyof ThemeSelection; option: ThemeOption }>;
}

export function buildMockupPrompt(basePrompt: string | undefined, theme: ThemeSelection): PromptBuildResult {
  const segments: string[] = [];
  const appliedOptions: Array<{ type: keyof ThemeSelection; option: ThemeOption }> = [];

  const trimmedBase = basePrompt?.trim();
  if (trimmedBase && trimmedBase.length > 0) {
    segments.push(trimmedBase);
  } else {
    segments.push('High-fidelity homepage hero mockup for a responsive digital product');
  }

  const angleOption = findThemeOption(cameraAngles, theme.angle);
  if (angleOption) {
    segments.push(angleOption.prompt);
    appliedOptions.push({ type: 'angle', option: angleOption });
  }

  const moodOption = findThemeOption(moodStyles, theme.mood);
  if (moodOption) {
    segments.push(moodOption.prompt);
    appliedOptions.push({ type: 'mood', option: moodOption });
  }

  const lightingOption = findThemeOption(lightingStyles, theme.lighting);
  if (lightingOption) {
    segments.push(lightingOption.prompt);
    appliedOptions.push({ type: 'lighting', option: lightingOption });
  }

  const interiorOption = findThemeOption(interiorStyles, theme.interior);
  if (interiorOption) {
    segments.push(interiorOption.prompt);
    appliedOptions.push({ type: 'interior', option: interiorOption });
  }

  return {
    prompt: segments.join('. '),
    appliedOptions,
  };
}
