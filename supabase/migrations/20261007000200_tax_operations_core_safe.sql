-- Canonical tax operations tables for Supersonic Fast Cash Starter.
-- Provider credentials and sensitive identifiers remain in secret management, never table defaults.
create table if not exists public.tax_documents (
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null,
 client_id uuid references public.tax_clients(id) on delete cascade, return_id uuid references public.tax_returns(id) on delete cascade,
 tax_year integer not null, document_type text not null, file_name text not null, storage_bucket text not null default 'tax-documents',
 storage_path text not null, file_size bigint, mime_type text, status text not null default 'uploaded',
 uploaded_by uuid references auth.users(id) on delete set null, reviewed_by uuid references auth.users(id) on delete set null,
 reviewed_at timestamptz, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.tax_intake (
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null,
 client_id uuid references public.tax_clients(id) on delete set null, office_id uuid references public.tax_offices(id) on delete set null,
 assigned_preparer_id uuid references public.tax_preparers(id) on delete set null, tax_year integer not null,
 service_type text not null default 'tax_preparation', status text not null default 'started', intake_data jsonb not null default '{}'::jsonb,
 submitted_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.tax_return_drafts (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade,
 version integer not null default 1, draft_data jsonb not null default '{}'::jsonb, created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(), unique(return_id,version));
create table if not exists public.tax_calculations (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade, tax_year integer not null,
 filing_status text, total_income numeric(14,2), adjusted_gross_income numeric(14,2), taxable_income numeric(14,2), federal_tax numeric(14,2),
 total_tax numeric(14,2), federal_withholding numeric(14,2), estimated_refund numeric(14,2), amount_owed numeric(14,2),
 calculation_data jsonb not null default '{}'::jsonb, calculation_version text, calculated_at timestamptz not null default now());
create table if not exists public.refund_advance_applications (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade,
 client_id uuid not null references public.tax_clients(id) on delete cascade, office_id uuid references public.tax_offices(id) on delete set null,
 preparer_id uuid references public.tax_preparers(id) on delete set null, provider text not null default 'EPS', product_code text,
 requested_amount numeric(12,2), approved_amount numeric(12,2), status text not null default 'draft',
 provider_application_id text, provider_status_code text, provider_status_message text, consent_version text, consented_at timestamptz,
 submitted_at timestamptz, decision_at timestamptz, funded_at timestamptz, provider_payload jsonb not null default '{}'::jsonb,
 provider_response jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.refund_tracking (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade,
 refund_type text, expected_amount numeric(14,2), actual_amount numeric(14,2), status text, irs_status_code text, last_checked_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now());
alter table public.tax_documents enable row level security; alter table public.tax_intake enable row level security;
alter table public.tax_return_drafts enable row level security; alter table public.tax_calculations enable row level security;
alter table public.refund_advance_applications enable row level security; alter table public.refund_tracking enable row level security;
create policy "tax_documents_owner_read" on public.tax_documents for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
create policy "tax_intake_owner_read" on public.tax_intake for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
create policy "tax_operations_staff_drafts" on public.tax_return_drafts for all to authenticated using(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer'))) with check(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
create policy "tax_operations_staff_calculations" on public.tax_calculations for all to authenticated using(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer'))) with check(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
create policy "tax_operations_staff_advances" on public.refund_advance_applications for all to authenticated using(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer'))) with check(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
create policy "tax_operations_staff_refund_tracking" on public.refund_tracking for all to authenticated using(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer'))) with check(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
