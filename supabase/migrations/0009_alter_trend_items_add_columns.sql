alter table if exists public.trend_items
  add column if not exists video_id text,
  add column if not exists channel_title text,
  add column if not exists category_id text,
  add column if not exists category_name text,
  add column if not exists published_at timestamptz,
  add column if not exists thumbnail_url text;


