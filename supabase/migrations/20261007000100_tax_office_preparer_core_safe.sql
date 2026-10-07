-- Canonical Starter tax office/preparer core. Sensitive identifiers are never seeded.
create table if not exists public.tax_offices (
 id uuid primary key default gen_random_uuid(), office_code varchar(20) unique not null, office_name varchar(255) not null,
 owner_id uuid references auth.users(id), owner_name varchar(255) not null, owner_email varchar(255) not null, owner_phone varchar(20),
 address_street varchar(255) not null, address_city varchar(100) not null, address_state varchar(2) not null, address_zip varchar(10) not null,
 business_ein varchar(20), state_license varchar(50), parent_efin varchar(6),
 status varchar(20) not null default 'pending' check(status in ('pending','active','suspended','terminated')),
 activated_at timestamptz, suspended_at timestamptz, suspension_reason text, max_preparers integer default 10, max_returns_per_season integer,
 created_at timestamptz default now(), updated_at timestamptz default now(), created_by uuid references auth.users(id), notes text);
create table if not exists public.tax_preparers (
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id), first_name varchar(100) not null, last_name varchar(100) not null,
 email varchar(255) not null unique, phone varchar(20), ptin varchar(20) not null unique, ptin_expiration date,
 office_id uuid references public.tax_offices(id) on delete set null, certification_level varchar(50), certifications jsonb default '[]'::jsonb,
 training_completed_at timestamptz, annual_refresher_due date, efin_authorized boolean default false, ero_authorized boolean default false,
 status varchar(20) not null default 'pending' check(status in ('pending','active','suspended','terminated')), activated_at timestamptz,
 suspended_at timestamptz, suspension_reason text, returns_prepared_lifetime integer default 0, returns_prepared_current_season integer default 0,
 rejection_rate numeric(5,2) default 0, average_refund numeric(12,2), compensation_type varchar(20) default 'per_return',
 per_return_rate numeric(10,2), hourly_rate numeric(10,2), commission_percent numeric(5,2), created_at timestamptz default now(),
 updated_at timestamptz default now(), created_by uuid references auth.users(id), notes text);
create table if not exists public.tax_audit_log (
 id uuid primary key default gen_random_uuid(), event_type varchar(50) not null, event_description text, user_id uuid references auth.users(id),
 preparer_id uuid references public.tax_preparers(id) on delete set null, office_id uuid references public.tax_offices(id) on delete set null,
 entity_type varchar(50), entity_id uuid, old_values jsonb, new_values jsonb, ip_address inet, user_agent text, created_at timestamptz default now());
alter table public.tax_clients add column if not exists office_id uuid references public.tax_offices(id) on delete set null;
alter table public.tax_returns add column if not exists office_id uuid references public.tax_offices(id) on delete set null;
alter table public.mef_submissions add column if not exists office_id uuid references public.tax_offices(id) on delete set null;
alter table public.mef_submissions add column if not exists preparer_id uuid references public.tax_preparers(id) on delete set null;
alter table public.mef_submissions add column if not exists ero_id uuid references public.tax_preparers(id) on delete set null;
alter table public.mef_submissions add column if not exists preparer_ptin varchar(20);
alter table public.tax_offices enable row level security; alter table public.tax_preparers enable row level security; alter table public.tax_audit_log enable row level security;
create policy "tax_offices_admin_access" on public.tax_offices for all to authenticated using(owner_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin'))) with check(owner_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin')));
create policy "tax_preparers_self_admin_access" on public.tax_preparers for all to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin'))) with check(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin')));
create policy "tax_audit_admin_read" on public.tax_audit_log for select to authenticated using(exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin')));
