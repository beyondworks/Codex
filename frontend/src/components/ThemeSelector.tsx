import {
  CAMERA_ANGLES,
  INTERIOR_OPTIONS,
  LIGHTING_OPTIONS,
  MOOD_OPTIONS,
  type ThemeOption,
} from '../data/themeOptions';
import type { ThemeSelection } from '../types';

interface ThemeSelectorProps {
  selection: ThemeSelection;
  onChange: (selection: ThemeSelection) => void;
}

function renderSelect(
  label: string,
  field: keyof ThemeSelection,
  options: ThemeOption[],
  selection: ThemeSelection,
  onChange: (selection: ThemeSelection) => void,
) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select
        value={selection[field] ?? ''}
        onChange={(event) => onChange({ ...selection, [field]: event.target.value })}
      >
        <option value="">선택 안 함</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="field__hint">
        {selection[field]
          ? options.find((option) => option.id === selection[field])?.description
          : '테마를 선택하여 분위기를 더하세요.'}
      </span>
    </label>
  );
}

export function ThemeSelector({ selection, onChange }: ThemeSelectorProps) {
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>테마 & 무드</h2>
          <p className="panel__description">앵글, 분위기, 조명, 인테리어를 조합해 원하는 느낌의 목업을 만들 수 있습니다.</p>
        </div>
      </header>
      <div className="theme-grid">
        {renderSelect('앵글', 'angle', CAMERA_ANGLES, selection, onChange)}
        {renderSelect('분위기', 'mood', MOOD_OPTIONS, selection, onChange)}
        {renderSelect('조명', 'lighting', LIGHTING_OPTIONS, selection, onChange)}
        {renderSelect('인테리어', 'interior', INTERIOR_OPTIONS, selection, onChange)}
      </div>
    </section>
  );
}
