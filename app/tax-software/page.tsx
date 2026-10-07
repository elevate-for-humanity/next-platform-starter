import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, FileCheck2, Landmark, LockKeyhole, ShieldCheck, Workflow } from 'lucide-react';

export const metadata = {
  title: 'Supersonic Fast Cash Tax Software | Professional Tax Preparation Platform',
  description:
    'Professional tax preparation software for EROs and tax offices with client intake, preparer workflows, IRS MeF architecture, acknowledgments, and bank-product integration readiness.',
};

const capabilities = [
  ['Tax Office Management', 'Manage offices, preparers, client assignments, PTIN authorization status, return workflow, and audit history.', Building2],
  ['Return Preparation', 'Structured client, dependent, W-2, 1099, Schedule C, deduction, calculation, draft, and review workflows.', FileCheck2],
  ['IRS MeF Architecture', 'Submission, transmission-status, acknowledgment, rejection, and error-tracking infrastructure designed for IRS Modernized e-File workflows.', Landmark],
  ['Bank Product Ready', 'Refund-advance and refund-transfer workflow architecture prepared for approved provider integrations, including EPS configuration support.', Workflow],
  ['Security by Design', 'Role-based access, row-level security, audit records, protected document references, and separation of provider credentials from application data.', ShieldCheck],
  ['Client Document Workflow', 'Secure document records linked to clients and returns with review and verification states.', LockKeyhole],
] as const;

export default function TaxSoftwarePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Supersonic Fast Cash Software
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Professional tax software built for the complete tax-office workflow.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Prepare returns, manage preparers and offices, organize taxpayer documents, track filing status,
              and operate from one secure platform designed around professional tax preparation and electronic filing.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950">
                Software partnership inquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tax" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white">
                Tax preparation services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Platform capabilities</p>
            <h2 className="mt-3 text-3xl font-bold">One operating system for a professional tax office.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title, description, Icon]) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-6">
                <Icon className="h-7 w-7" />
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">For tax professionals</p>
            <h2 className="mt-3 text-3xl font-bold">Designed for EROs, preparers, and multi-office operations.</h2>
            <div className="mt-7 space-y-4">
              {[
                'Office and preparer management',
                'Return preparation and review states',
                'Taxpayer document organization',
                'Electronic-filing status and rejection workflow',
                'Refund-advance application workflow',
                'Audit and compliance records',
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl bg-slate-950 p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Integration status</p>
            <h2 className="mt-3 text-2xl font-bold">Built for approved IRS and banking-provider connections.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Supersonic Fast Cash includes architecture for IRS MeF and EPS bank-product connectivity.
              Production transmission and bank products are enabled only after the applicable external
              certification, credentials, testing, and provider approval are complete.
            </p>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              This page does not represent current EPS certification, Pathward approval, or IRS software-provider
              production authorization where those approvals have not yet been issued.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-slate-200 p-8 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold">Software providers and financial partners</h2>
              <p className="mt-3 text-slate-600">
                Contact us for technical integration, certification, bank-product, and software-partnership discussions.
              </p>
            </div>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white lg:mt-0">
              Contact the software team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
