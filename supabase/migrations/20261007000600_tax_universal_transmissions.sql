alter table public.mef_submissions alter column efin drop default;
create table if not exists public.tax_transmissions (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade,
 user_id uuid references auth.users(id) on delete set null, destination text not null, protocol text not null,
 idempotency_key text not null unique, provider_reference text, status text not null default 'queued'
 check(status in ('queued','validating','ready','sent','acknowledged','accepted','rejected','failed')),
 payload_sha256 text, attempt_count integer not null default 0, last_error text, metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), sent_at timestamptz, acknowledged_at timestamptz);
alter table public.tax_transmissions enable row level security;
create index if not exists tax_transmissions_return_idx on public.tax_transmissions(return_id);
create index if not exists tax_transmissions_status_idx on public.tax_transmissions(status);
create policy "tax_transmissions_owner_staff" on public.tax_transmissions for select to authenticated using(
 exists(select 1 from public.tax_returns r where r.id=tax_transmissions.return_id and (r.user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')))));
