import { FormEvent, useMemo, useState } from 'react';
import './App.css';
import { captureScreenshot, generateImageMockups, generateTextMockups } from './api/client';
import { DeviceSelector } from './components/DeviceSelector';
import { MockupGallery } from './components/MockupGallery';
import { ScreenshotPreview } from './components/ScreenshotPreview';
import { ThemeSelector } from './components/ThemeSelector';
import { DEVICE_OPTIONS, DEFAULT_DEVICE_ID } from './data/deviceProfiles';
import {
  ASPECT_RATIO_OPTIONS,
  DEFAULT_ASPECT_RATIO,
} from './data/themeOptions';
import type { CaptureResponse, MockupAsset, ThemeSelection } from './types';

const DEFAULT_PROMPT = 'Modern landing page for a digital product with clear hero, feature highlights and pricing tiers';

function App() {
  const [targetUrl, setTargetUrl] = useState('');
  const [deviceId, setDeviceId] = useState(DEFAULT_DEVICE_ID);
  const [themeSelection, setThemeSelection] = useState<ThemeSelection>({
    angle: 'eye-level',
    mood: 'minimal',
    lighting: 'daylight',
    interior: 'studio',
  });
  const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO);
  const [variations, setVariations] = useState(2);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);

  const [capture, setCapture] = useState<CaptureResponse | null>(null);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [isCapturing, setIsCapturing] = useState(false);
  const [isTextGenerating, setIsTextGenerating] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);

  const [textMockups, setTextMockups] = useState<MockupAsset[]>([]);
  const [imageMockups, setImageMockups] = useState<MockupAsset[]>([]);

  const selectedDevice = useMemo(
    () => DEVICE_OPTIONS.find((device) => device.id === deviceId) ?? DEVICE_OPTIONS[0],
    [deviceId],
  );

  const baseGenerationPayload = {
    prompt,
    aspectRatio,
    variations,
    ...themeSelection,
  };

  const handleCapture = async (event: FormEvent) => {
    event.preventDefault();
    if (!targetUrl.trim()) {
      setCaptureError('캡쳐할 링크를 입력해주세요.');
      return;
    }

    setIsCapturing(true);
    setCaptureError(null);

    try {
      const response = await captureScreenshot({ url: targetUrl, deviceId });
      setCapture(response);
    } catch (error) {
      setCaptureError(error instanceof Error ? error.message : '캡쳐에 실패했습니다.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleGenerateTextMockups = async () => {
    setIsTextGenerating(true);
    setGenerationError(null);
    try {
      const assets = await generateTextMockups(baseGenerationPayload);
      setTextMockups(assets);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : '목업 생성에 실패했습니다.');
    } finally {
      setIsTextGenerating(false);
    }
  };

  const handleGenerateImageMockups = async () => {
    if (!capture) {
      setGenerationError('먼저 캡쳐를 완료해주세요.');
      return;
    }

    setIsImageGenerating(true);
    setGenerationError(null);
    try {
      const assets = await generateImageMockups({
        ...baseGenerationPayload,
        screenshotPath: capture.screenshotPath,
      });
      setImageMockups(assets);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : '목업 생성에 실패했습니다.');
    } finally {
      setIsImageGenerating(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Nano Banana Mockup Studio</h1>
          <p>링크 캡쳐와 AI 이미지 합성을 통해 고해상도 홈페이지 목업을 빠르게 제작하세요.</p>
        </div>
      </header>
      <main className="app-main">
        <form className="panel capture-form" onSubmit={handleCapture}>
          <header className="panel__header">
            <div>
              <h2>링크 캡쳐</h2>
              <p className="panel__description">
                URL을 입력하고 디바이스 뷰포트를 선택하면 해당 해상도로 페이지를 캡쳐합니다.
              </p>
            </div>
          </header>
          <label className="field">
            <span className="field__label">캡쳐할 링크</span>
            <input
              type="url"
              placeholder="https://example.com"
              value={targetUrl}
              onChange={(event) => setTargetUrl(event.target.value)}
              required
            />
          </label>
          <div className="capture-form__meta">
            <span className="field__hint">
              선택된 디바이스: {selectedDevice.label} · {selectedDevice.width} × {selectedDevice.height}px
            </span>
            <button className="button" type="submit" disabled={isCapturing}>
              {isCapturing ? '캡쳐 중…' : '링크 캡쳐'}
            </button>
          </div>
        </form>

        {captureError && <div className="alert alert--error">{captureError}</div>}
        {generationError && <div className="alert alert--error">{generationError}</div>}

        <DeviceSelector devices={DEVICE_OPTIONS} selectedId={deviceId} onSelect={setDeviceId} />
        <ThemeSelector selection={themeSelection} onChange={setThemeSelection} />

        <section className="panel">
          <header className="panel__header">
            <div>
              <h2>프롬프트 & 출력 옵션</h2>
              <p className="panel__description">테마와 함께 사용할 프롬프트, 종횡비, 변형 수량을 설정하세요.</p>
            </div>
          </header>
          <label className="field">
            <span className="field__label">프롬프트</span>
            <textarea
              value={prompt}
              rows={3}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={DEFAULT_PROMPT}
            />
          </label>
          <div className="options-grid">
            <label className="field">
              <span className="field__label">종횡비</span>
              <select value={aspectRatio} onChange={(event) => setAspectRatio(event.target.value)}>
                {ASPECT_RATIO_OPTIONS.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="field__hint">
                {ASPECT_RATIO_OPTIONS.find((option) => option.value === aspectRatio)?.description}
              </span>
            </label>
            <label className="field">
              <span className="field__label">변형 개수</span>
              <input
                type="range"
                min={1}
                max={4}
                value={variations}
                onChange={(event) => setVariations(Number(event.target.value))}
              />
              <span className="field__hint">{variations}장 생성</span>
            </label>
          </div>
          <div className="action-row">
            <button className="button" type="button" onClick={handleGenerateTextMockups} disabled={isTextGenerating}>
              {isTextGenerating ? '생성 중…' : '텍스트 기반 목업 생성'}
            </button>
            <button
              className="button button--secondary"
              type="button"
              onClick={handleGenerateImageMockups}
              disabled={isImageGenerating || !capture}
            >
              {isImageGenerating ? '생성 중…' : '캡쳐 기반 목업 생성'}
            </button>
          </div>
        </section>

        <ScreenshotPreview capture={capture} />
        <MockupGallery
          title="텍스트 기반 목업"
          subtitle="프롬프트와 테마만으로 생성한 레이아웃"
          assets={textMockups}
          isLoading={isTextGenerating}
        />
        <MockupGallery
          title="캡쳐 기반 목업"
          subtitle="캡쳐 이미지를 참고해 재해석한 목업"
          assets={imageMockups}
          isLoading={isImageGenerating}
        />
      </main>
    </div>
  );
}

export default App;
