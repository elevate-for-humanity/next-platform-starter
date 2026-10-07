# EPS Software Provider Readiness

## Product
Supersonic Fast Cash tax preparation software.

## Current platform capabilities
- Dedicated Starter Supabase tax backend.
- Tax firms, offices, preparers, clients, returns, dependents, W-2, 1099, Schedule C, itemized deductions.
- Return lifecycle, transmission status, and audit structures.
- MeF submission, acknowledgment, rejection/error data models.
- IRS MeF configuration slots for EFIN, Software ID, Assurance/Production environment, and client certificates.
- EPS configuration slots for API URL/key, account number, serial number, and e-file password.
- Refund-advance application data model in the repository.
- Authentication/RLS controls for tax office and preparer access.

## Required from EPS
1. Software-provider onboarding/certification agreement and technical contact.
2. Current API/file-exchange specification.
3. Sandbox/certification endpoint and test credentials.
4. Refund Transfer and Taxpayer Advance schemas and required taxpayer disclosures.
5. Status/funding/rejection/disbursement/settlement specifications.
6. Webhook or polling requirements, idempotency/retry rules, and reconciliation files.
7. Production credential issuance process and go-live certification criteria.
8. 2027 program identifiers, fee tables, state restrictions, and software-provider availability.
9. Pathward branding/compliance requirements.
10. Required reporting, audit retention, security review, penetration testing, and incident-notification requirements.

## Meeting questions
- What is the formal process for adding Supersonic Fast Cash to EPS's software-partner list?
- What protocol does EPS expose to software providers?
- Is there a separate certification environment?
- What test cases must pass before production credentials are issued?
- Can one software provider support multiple EROs/EFINs and offices?
- Which identifiers must accompany each bank-product application?
- How are pre-ack advances, in-season advances, refund transfers, fees, funding, rejects, and disbursements represented?
- What taxpayer consent/disclosure artifacts must the software capture and retain?
- What event/webhook or polling mechanism communicates underwriting and funding decisions?
- What reconciliation/reporting files are required?
- What are the 2027 software-provider certification deadlines?

## Do not claim until externally verified
- EPS production connectivity or certification.
- IRS production MeF software-provider approval/ATS completion.
- Production bank-product processing.
