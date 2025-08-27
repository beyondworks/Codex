create table if not exists public.popular_products (
  id bigint generated always as identity primary key,
  rank int not null,
  title text not null,
  price bigint not null,
  rating numeric not null,
  sales bigint not null,
  growth numeric not null,
  creator text,
  image_url text,
  updated_at timestamptz not null default now()
);

alter table public.popular_products enable row level security;
do $$ begin
  create policy popular_products_select_public on public.popular_products
    for select using (true);
exception when duplicate_object then null; end $$;


