-- Lead submissions from the B2C contact form. This Supabase project is SHARED
-- with the Supertalent (B2B) site — its tables are `leads` / `settings`, this
-- site's carry the b2c_ prefix so the two never mix.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.b2c_leads (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  fullname   text not null,
  email      text not null default '',
  phone      text not null default '',
  message    text not null default '',
  updates    boolean not null default false,
  source     text not null default ''
);

-- No policies on purpose: with RLS enabled and no policies, the anon and
-- authenticated roles can do nothing. Only the server's secret key (which
-- bypasses RLS) can read or write leads.
alter table public.b2c_leads enable row level security;

create index if not exists b2c_leads_created_at_idx on public.b2c_leads (created_at desc);
