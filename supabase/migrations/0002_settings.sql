-- Key/value store for B2C site settings editable at /admin/settings
-- (Zapier webhook URL, contact "to" email, site-wide <head>/<body> scripts).
-- Keys are upserted by the app, so new settings need no migration.
-- Shares the Supertalent Supabase project — hence the b2c_ prefix.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.b2c_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

-- Same stance as `b2c_leads`: RLS on, no policies — only the server's secret
-- key (which bypasses RLS) can read or write.
alter table public.b2c_settings enable row level security;
