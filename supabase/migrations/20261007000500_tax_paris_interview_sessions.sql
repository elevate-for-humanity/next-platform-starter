create table if not exists public.tax_interview_sessions (
 id uuid primary key default gen_random_uuid(), return_id uuid not null references public.tax_returns(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade, current_section text not null default 'profile',
 completed_sections jsonb not null default '[]'::jsonb, answers jsonb not null default '{}'::jsonb,
 active_triggers jsonb not null default '[]'::jsonb, missing_items jsonb not null default '[]'::jsonb,
 started_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(return_id,user_id));
alter table public.tax_interview_sessions enable row level security;
create index if not exists tax_interview_sessions_return_idx on public.tax_interview_sessions(return_id);
create policy "tax_interview_owner_staff" on public.tax_interview_sessions for all to authenticated
using(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')))
with check(user_id=(select auth.uid()) or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','super_admin','tax_preparer')));
