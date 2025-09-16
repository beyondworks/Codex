import type { MockupAsset } from '../types';

interface MockupGalleryProps {
  title: string;
  subtitle: string;
  assets: MockupAsset[];
  isLoading: boolean;
}

export function MockupGallery({ title, subtitle, assets, isLoading }: MockupGalleryProps) {
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>{title}</h2>
          <p className="panel__description">{subtitle}</p>
        </div>
      </header>
      {isLoading ? (
        <div className="empty-state">생성 중입니다. 잠시만 기다려 주세요…</div>
      ) : assets.length === 0 ? (
        <div className="empty-state">아직 생성된 목업이 없습니다.</div>
      ) : (
        <div className="mockup-grid">
          {assets.map((asset) => (
            <article key={asset.id} className="mockup-card">
              <img src={asset.thumbnailUrl ?? asset.url} alt="생성된 목업 미리보기" loading="lazy" />
              <footer>
                <a className="button button--ghost" href={asset.url} download target="_blank" rel="noreferrer">
                  다운로드
                </a>
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
