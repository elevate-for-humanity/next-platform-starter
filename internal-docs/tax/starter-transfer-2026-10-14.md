# Supersonic Fast Cash source transfer — October 14, 2026

Canonical requested source repository: `elevate-for-humanity/next-platform-starter`, branch `main`.

Compared starter `da64dcbbab9347e9e94b6ec29668a946db6427e5` with Elevate-lms `81883519e6041ce796f58cd4be632ea3e820b3ef`. LMS contained substantial tax work absent from starter. Transferred the tax library, current-year calculators and credit worksheets, XML/ATS packaging tools, taxpayer and office workspaces, recruiting pages, relevant SQL migrations, tests and required dependencies. Marketing app routes were adapted to starter's root `app/` layout. 112 files were added or updated in transfer commit `9c6144cc87e3ee6dc96c41602d33490c973b20d2`. No LMS source was deleted.

## Local verification

- 19 tax test files / 101 tests passed using Vitest 4.1.11 and Zod 4.1.12 (lockfile versions), with a Node-only tax test configuration.
- Calculation HTTP-contract failure checks: 18 passed.
- W-2 HTTP-contract checks: 7 passed.
- Python IRS XML tests: 4 passed.
- Encryption provisioning regression tests: 6 passed with mocked Google calls; no runtime secrets were provisioned or rotated.
- Public-route and redirect guards passed.
- GitHub tax validation passed for both the transfer and the tax-office lint fix.
- The transferred office route had one lint warning (`module` variable); fixed in `90db01233cbe7f7d37c32c600818a37bd56bf49b`, and GitHub legacy lint passed.
- The standard full build exceeded this host's 8 GiB memory limit (exit 137). A second attempt using one worker, Webpack memory optimizations and a 4 GiB Node heap also failed with JavaScript heap exhaustion / SIGABRT. Temporary configuration was reverted. The full build is not verified and requires a build runner with sufficient memory. Tax tests passing does not establish that the full build succeeds.

## IRS evidence boundary

The described simulated ATS runner was not found in either inspected main checkout. The available runner builds and audits local packages. It does not send requests to IRS ATS. Its output now explicitly records local evidence, `irsTransmitted: false`, `irsResponseReceived: false`, `irsReceiptNumber: null`, and `atsAccepted: false`. Local exports report `exported`; local idempotency keys are no longer exposed as provider receipt references. Tests enforce these distinctions.

## Remaining verification

Source transfer is not proof of a live deployment. Starter's source-validation workflow previously identified the LMS marketing app as the production owner; actual tax runtime deployment/source mapping still needs verification. No runtime was switched in this transfer. The automatic ADMIN deployment failed its configuration gate because `GCP_DEPLOY_SERVICE_ACCOUNT` is missing. A valid deployment identity must be configured before release can be verified. The existing automatic migration workflow applied three transferred migrations to the shared Elevate database. It initially failed an older operations migration because the legacy intake table lacked `user_id`. Compatibility repair `146167e70ec9bc5902c2beec7f631e3cd896f50b` adds nullable ownership columns before policies without assigning ownership to historical rows. Read-only SQL confirmed the ownership column and policy exist. The separate Starter database already had these columns; production database selection still needs verification. The migration job subsequently reported zero failed migrations, but its unrelated `Verify lms_lessons` step failed. Current-year official ATS fixture coverage, official XML schemas/business rules, Drake credentials/connectivity, IRS transport and actual IRS ATS acceptance remain unverified. No real taxpayer return was submitted.
