create table if not exists public.popular_categories (
  id bigint generated always as identity primary key,
  name text not null,
  share numeric not null,
  change numeric not null,
  color text not null default 'bg-blue-500',
  updated_at timestamptz not null default now()
);

alter table public.popular_categories enable row level security;
do $$ begin
  create policy popular_categories_select_public on public.popular_categories
    for select using (true);
exception when duplicate_object then null; end $$;


