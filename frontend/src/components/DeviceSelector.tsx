import type { DeviceProfile } from '../types';

interface DeviceSelectorProps {
  devices: DeviceProfile[];
  selectedId: string;
  onSelect: (deviceId: string) => void;
}

export function DeviceSelector({ devices, selectedId, onSelect }: DeviceSelectorProps) {
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>디바이스 선택</h2>
          <p className="panel__description">캡쳐할 해상도를 선택하면 해당 뷰포트로 페이지를 캡쳐합니다.</p>
        </div>
      </header>
      <div className="device-grid" role="list">
        {devices.map((device) => {
          const isActive = device.id === selectedId;
          return (
            <button
              key={device.id}
              type="button"
              className={`device-card${isActive ? ' device-card--active' : ''}`}
              onClick={() => onSelect(device.id)}
              aria-pressed={isActive}
            >
              <span className="device-card__label">{device.label}</span>
              <span className="device-card__meta">
                {device.width} × {device.height} · {device.category}
              </span>
              <span className="device-card__description">{device.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
