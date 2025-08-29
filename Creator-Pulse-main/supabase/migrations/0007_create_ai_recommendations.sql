-- AI 인사이트 추천 테이블
create table if not exists public.ai_recommendations (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  priority text not null default 'medium', -- 'high', 'medium', 'low'
  category text not null,
  confidence numeric not null default 0,
  updated_at timestamptz not null default now()
);

-- 공개 읽기 권한 (익명 조회 허용)
alter table public.ai_recommendations enable row level security;
do $$ begin
  create policy ai_recommendations_select_public on public.ai_recommendations
    for select
    using ( true );
exception when duplicate_object then null; end $$;

-- 샘플 데이터 삽입
insert into public.ai_recommendations (title, description, priority, category, confidence) values
  ('콘텐츠 최적화', '썸네일에 가격 정보 포함 시 CTR 23% 증가', 'high', '콘텐츠', 85),
  ('상품 조합', '무선이어폰 + 스마트워치 번들 추천', 'medium', '상품', 70),
  ('타겟 오디언스', '25-34세 여성층 대상 뷰티 제품 집중 공략', 'high', '타겟팅', 90),
  ('업로드 시간', '저녁 7-9시 업로드 시 조회수 35% 상승', 'high', '콘텐츠', 88),
  ('가격대 전략', '5-10만원 가격대 제품이 최적 수익률 달성', 'medium', '상품', 75),
  ('콘텐츠 길이', '8-12분 길이의 리뷰 영상이 가장 높은 참여율', 'medium', '콘텐츠', 82);