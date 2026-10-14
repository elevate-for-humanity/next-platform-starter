# Supersonic Fast Cash source transfer — October 14, 2026

Canonical requested source repository: `elevate-for-humanity/next-platform-starter`, branch `main`.

Compared starter `da64dcbbab9347e9e94b6ec29668a946db6427e5` with Elevate-lms `81883519e6041ce796f58cd4be632ea3e820b3ef`. LMS contained substantial tax work absent from starter. Transferred the tax library, current-year calculators and credit worksheets, XML/ATS packaging tools, taxpayer and office workspaces, recruiting pages, relevant SQL migrations, tests and required dependencies. Marketing app routes were adapted to starter's root `app/` layout. No LMS source was deleted.

## Local verification

- 19 tax test files / 101 tests passed using Vitest 4.1.11 and Zod 4.1.12 (lockfile versions), with a Node-only tax test configuration.
- Calculation HTTP-contract failure checks: 18 passed.
- W-2 HTTP-contract checks: 7 passed.
- Python IRS XML tests: 4 passed.
- Encryption provisioning regression tests: 6 passed with mocked Google calls; no runtime secrets were provisioned or rotated.
- Public-route and redirect guards passed.

## IRS evidence boundary

The described simulated ATS runner was not found in either inspected main checkout. The available runner builds and audits local packages. It does not send requests to IRS ATS. Its output now explicitly records local evidence, `irsTransmitted: false`, `irsResponseReceived: false`, `irsReceiptNumber: null`, and `atsAccepted: false`. Local exports report `exported`; local idempotency keys are no longer exposed as provider receipt references. Tests enforce these distinctions.

## Remaining verification

Source transfer is not proof of a live deployment. Starter's source-validation workflow previously identified the LMS marketing app as the production owner; actual tax runtime deployment/source mapping still needs verification. No runtime was switched in this transfer. Migrations were copied as source files only; application to the correct database is not established. Current-year official ATS fixture coverage, official XML schemas/business rules, Drake credentials/connectivity, IRS transport and actual IRS ATS acceptance remain unverified. No real taxpayer return was submitted.
