create table if not exists public.dashboard_kpis (
  id bigint generated always as identity primary key,
  title text not null,
  value text not null,
  change text not null,
  color text not null,
  bg_color text not null,
  icon text not null default 'Activity',
  updated_at timestamptz not null default now()
);

alter table public.dashboard_kpis enable row level security;
do $$ begin
  create policy dashboard_kpis_select_public on public.dashboard_kpis
    for select using (true);
exception when duplicate_object then null; end $$;


