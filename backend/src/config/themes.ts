export interface ThemeOption {
  id: string;
  label: string;
  prompt: string;
}

export const cameraAngles: ThemeOption[] = [
  {
    id: 'eye-level',
    label: 'Eye level',
    prompt: 'Eye-level angle that feels natural and centered',
  },
  {
    id: 'isometric',
    label: 'Isometric',
    prompt: 'Isometric three-quarter view that highlights depth',
  },
  {
    id: 'hero',
    label: 'Hero perspective',
    prompt: 'Dynamic hero perspective with slight tilt for energy',
  },
  {
    id: 'top-down',
    label: 'Top down',
    prompt: "Bird\'s-eye view capturing the whole layout",
  },
];

export const moodStyles: ThemeOption[] = [
  {
    id: 'minimal',
    label: 'Minimal & clean',
    prompt: 'Minimalist, clean visual language with soft contrasts',
  },
  {
    id: 'vibrant',
    label: 'Vibrant & bold',
    prompt: 'Bold color blocking with energetic gradients and accents',
  },
  {
    id: 'serene',
    label: 'Serene & calm',
    prompt: 'Calming neutrals with gentle gradients and natural textures',
  },
  {
    id: 'futuristic',
    label: 'Futuristic',
    prompt: 'Futuristic UI aesthetic with luminous highlights and glassmorphism',
  },
];

export const lightingStyles: ThemeOption[] = [
  {
    id: 'daylight',
    label: 'Natural daylight',
    prompt: 'Soft natural daylight with balanced shadows',
  },
  {
    id: 'noir',
    label: 'Noir lighting',
    prompt: 'Moody lighting with high contrast and cinematic shadows',
  },
  {
    id: 'studio',
    label: 'Studio softbox',
    prompt: 'Studio softbox lighting that evenly illuminates surfaces',
  },
  {
    id: 'warm',
    label: 'Warm interior glow',
    prompt: 'Warm ambient lighting with gentle highlights for depth',
  },
];

export const interiorStyles: ThemeOption[] = [
  {
    id: 'studio',
    label: 'Design studio',
    prompt: 'Set within a modern creative studio with prototyping tools',
  },
  {
    id: 'workspace',
    label: 'Product workspace',
    prompt: 'Featured on a product designer workspace with notebooks and tablets',
  },
  {
    id: 'lounge',
    label: 'Lounge interior',
    prompt: 'Placed inside a contemporary lounge with soft furniture and plants',
  },
  {
    id: 'retail',
    label: 'Retail showroom',
    prompt: 'Integrated into a boutique retail showroom with curated lighting',
  },
];

export function findThemeOption(options: ThemeOption[], id: string | undefined): ThemeOption | undefined {
  if (!id) {
    return undefined;
  }
  return options.find((option) => option.id === id);
}
