import type { CaptureResponse } from '../types';

interface ScreenshotPreviewProps {
  capture: CaptureResponse | null;
}

export function ScreenshotPreview({ capture }: ScreenshotPreviewProps) {
  if (!capture) {
    return (
      <section className="panel">
        <header className="panel__header">
          <div>
            <h2>캡쳐 미리보기</h2>
            <p className="panel__description">URL과 디바이스를 선택하고 캡쳐하면 결과를 확인할 수 있습니다.</p>
          </div>
        </header>
        <div className="empty-state">아직 캡쳐된 이미지가 없습니다.</div>
      </section>
    );
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>캡쳐 미리보기</h2>
          <p className="panel__description">
            {capture.device.label} · {capture.width} × {capture.height}
          </p>
        </div>
        <a className="button button--ghost" href={capture.screenshotUrl} download target="_blank" rel="noreferrer">
          원본 저장
        </a>
      </header>
      <div className="screenshot-frame">
        <img src={capture.screenshotUrl} alt={`${capture.device.label} 캡쳐 이미지`} />
      </div>
    </section>
  );
}
