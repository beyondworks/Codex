-- 실시간 트렌드 아이템 테이블
create table if not exists public.trend_items (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null,
  growth numeric not null default 0,
  views bigint not null default 0,          -- 예: 1200000
  revenue bigint not null default 0,        -- 원화 정수 (₩)
  trend text not null default 'up',         -- 'up' | 'down'
  updated_at timestamptz not null default now()
);

-- 공개 읽기 권한 (익명 조회 허용)
alter table public.trend_items enable row level security;
do $$ begin
  create policy trend_items_select_public on public.trend_items
    for select
    using ( true );
exception when duplicate_object then null; end $$;


