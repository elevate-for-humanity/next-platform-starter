create table if not exists public.tax_filing_authorizations (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade, authorization_type text not null default '8879', tax_year integer not null,
 taxpayer_name text not null, spouse_name text, declaration_version text not null, taxpayer_signed_at timestamptz, spouse_signed_at timestamptz,
 taxpayer_signature_method text, spouse_signature_method text, ip_address inet, user_agent text, return_snapshot_hash text not null,
 authorization_data jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(return_id,authorization_type,return_snapshot_hash));
alter table public.tax_filing_authorizations enable row level security;
create index if not exists tax_filing_authorizations_return_idx on public.tax_filing_authorizations(return_id);
create policy "tax_filing_authorizations_owner_staff" on public.tax_filing_authorizations for all to authenticated
using(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')))
with check(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
