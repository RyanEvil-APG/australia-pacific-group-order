create table if not exists public.apg_app_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.apg_app_state enable row level security;

-- The app server writes this table with SUPABASE_SERVICE_ROLE_KEY.
-- Do not expose the service role key in frontend/browser environment variables.
