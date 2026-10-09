# PARIS production release

The PARIS source lives in this repository's app/tax, app/tax-software,
app/api/tax, app/api/ocr/extract and lib/tax-software paths.

The existing public Google Marketing service owns www.elevateforhumanity.org.
Its source is elevate-for-humanity/Elevate-lms, under apps/marketing.
Tax routes are promoted there with an immutable source commit and a checksum
manifest. The Marketing Google workflow verifies the bundle, builds it with
its established runtime configuration, and checks the live /tax page and
unauthenticated API boundaries. The workforce LMS is a separate service.

The starter workflow validates tax source; it does not deploy the full legacy
workforce application. Do not configure it to replace elevate-lms-migration.

Saved preparation and interview data do not mean the return has been filed.
Production IRS and bank-provider transmissions require their own certified
adapters and external approvals.
