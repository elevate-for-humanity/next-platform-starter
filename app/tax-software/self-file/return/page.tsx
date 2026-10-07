'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {AlertTriangle,CheckCircle2,FileText,ReceiptText,ShieldCheck,WalletCards} from 'lucide-react';
import {TY2026_1040_FORM_REGISTRY,formsForTriggers} from '@/lib/tax-software/form-registry-2026';
import {quoteSelfFile} from '@/lib/tax-software/self-file-pricing';

type Diagnostic={level:'error'|'warning'|'info';message:string;section:string};
const sections=['Personal Info','Household','Income','Deductions','Credits','State','Review'] as const;

export default function ReturnWorkspacePage(){
 const [activeSection,setActiveSection]=useState<(typeof sections)[number]>('Income');
 const [triggers]=useState<string[]>(['w2_income']);
 const [diagnostics]=useState<Diagnostic[]>([
   {level:'warning',section:'Income',message:'Confirm every imported W-2 before final review.'},
 ]);
 const forms=useMemo(()=>formsForTriggers(triggers),[triggers]);
 const quote=useMemo(()=>quoteSelfFile(triggers),[triggers]);
 return <main className="min-h-screen bg-slate-100 text-slate-950">
  <div className="border-b bg-white"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
   <div><p className="text-sm font-semibold text-slate-500">Supersonic Fast Cash</p><h1 className="text-xl font-bold">2026 Individual Return</h1></div>
   <div className="flex items-center gap-3"><span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">In preparation</span><Link href="/tax-software/self-file" className="rounded-lg border px-4 py-2 text-sm font-semibold">PARIS Interview</Link></div>
  </div></div>
  <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[230px_minmax(0,1fr)_330px]">
   <aside className="border-r bg-white p-4 lg:min-h-[calc(100vh-73px)]">
    <p className="px-3 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Return sections</p>
    <nav className="space-y-1">{sections.map(s=><button key={s} onClick={()=>setActiveSection(s)} className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${activeSection===s?'bg-sky-50 text-sky-800':'text-slate-700 hover:bg-slate-50'}`}>{s}</button>)}</nav>
    <div className="mt-6 border-t pt-5"><p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">Source documents</p><Link href="/tax-software/self-file/w2/confirm" className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50"><FileText className="h-4 w-4"/>W-2 review</Link></div>
   </aside>
   <section className="p-6">
    <div className="rounded-2xl border bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-sky-700">{activeSection}</p><h2 className="mt-1 text-2xl font-bold">Return preparation workspace</h2></div><ShieldCheck className="h-7 w-7 text-emerald-600"/></div>
    <p className="mt-3 max-w-3xl text-slate-600">PARIS answers and confirmed source documents populate this workspace. Form activation, diagnostics, fees, and filing status remain visible while the return is prepared.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border p-5"><p className="text-sm font-semibold text-slate-500">Active forms</p><div className="mt-3 space-y-2">{forms.map(f=><div key={f.code} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"><span className="font-medium">{f.code}</span><span className="text-xs text-slate-500">{f.name}</span></div>)}</div></div>
      <div className="rounded-xl border p-5"><p className="text-sm font-semibold text-slate-500">Diagnostics</p><div className="mt-3 space-y-3">{diagnostics.length===0?<div className="flex gap-2 text-emerald-700"><CheckCircle2 className="h-5 w-5"/>No diagnostics</div>:diagnostics.map((d,i)=><div key={i} className="flex gap-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-950"><AlertTriangle className="h-5 w-5 shrink-0"/><div><p className="font-semibold">{d.section}</p><p>{d.message}</p></div></div>)}</div></div>
    </div>
    </div>
   </section>
   <aside className="border-l bg-white p-5 lg:min-h-[calc(100vh-73px)]">
    <div className="rounded-xl border p-4"><div className="flex items-center gap-2"><WalletCards className="h-5 w-5"/><h3 className="font-bold">Self-file price</h3></div><p className="mt-3 text-3xl font-bold">${quote.total.toFixed(2)}</p><p className="mt-1 text-sm text-slate-500">Base federal return: free</p>{quote.items.length>0&&<div className="mt-4 space-y-2 border-t pt-3">{quote.items.map(i=><div key={i.code} className="flex justify-between text-sm"><span>{i.label}</span><span>${i.price.toFixed(2)}</span></div>)}</div>}</div>
    <div className="mt-4 rounded-xl border p-4"><div className="flex items-center gap-2"><ReceiptText className="h-5 w-5"/><h3 className="font-bold">E-file status</h3></div><p className="mt-3 text-sm font-semibold text-slate-700">Not transmitted</p><p className="mt-1 text-sm text-slate-500">Preparation, validation and ATS/testing status are tracked separately from production transmission.</p></div>
   </aside>
  </div>
 </main>;
}
