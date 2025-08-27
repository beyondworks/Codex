create table if not exists public.market_insights (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  confidence numeric not null default 0,
  timeframe text not null default '',
  category text not null default '',
  priority text,
  updated_at timestamptz not null default now()
);

alter table public.market_insights enable row level security;
do $$ begin
  create policy market_insights_select_public on public.market_insights
    for select using (true);
exception when duplicate_object then null; end $$;


