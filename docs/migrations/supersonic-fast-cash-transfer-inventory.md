# Supersonic Fast Cash migration inventory (2026-10-19)

Source: `elevate-for-humanity/Elevate-lms`, reference `9f7648deacdea50f0fd184b646d20e1be151f180`.
Destination: `elevate-for-humanity/next-platform-starter`.

## Confirmed source locations
- `apps/marketing/app/tax-software/**`: Supersonic marketing and tax preparation UI.
- `apps/marketing/app/api/tax/**`: tax API routes, including returns checkout and office endpoints.
- `lib/tax-software/**`: tax application logic and search metadata.
- `supabase/migrations/*tax*` and `*sfc*`: migration candidates requiring dependency and data-ownership review; do not automatically replay or drop tables.
- `apps/marketing/public/images/tax/**`: candidate media referenced by tax UI.

## Confirmed integration dependencies
The tax landing page imports `@/lib/tax-software/search-metadata` and local `_components/TaxHero` and `_components/TaxSiteShell`, and references `/images/tax/supersonic-tax-hero-2026.webp`. A copy of the page alone will not work.

## Transfer acceptance gates
1. Inventory all nested files and imported modules, API routes, assets, middleware, and configuration.
2. Copy to Starter while retaining source files in Elevate until verified.
3. Review secrets and database ownership; do not copy credentials or production student records.
4. Run Starter build, route/API tests, and tax workflow checks in CI.
5. Verify hosting and rollback; remove migrated Elevate routes only after destination works.

Status: inventory initiated; migration, build, and production cutover **not yet verified**. The Cloud Shell copy of the source was reported partially deleted; restore tracked files from Git before any local migration.
