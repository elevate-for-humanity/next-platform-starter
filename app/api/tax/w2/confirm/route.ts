import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {applyRateLimit} from '@/lib/api/withRateLimit';

const money=(v:unknown)=>{const n=Number(v);return Number.isFinite(n)?n:null};
export async function POST(req:NextRequest){
 const limited=await applyRateLimit(req,'api'); if(limited)return limited;
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser();
 if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const body=await req.json();
 const returnId=String(body.returnId||'');
 if(!returnId)return NextResponse.json({error:'returnId is required'},{status:400});
 const {data:taxReturn,error:returnError}=await supabase.from('tax_returns').select('id,user_id').eq('id',returnId).eq('user_id',user.id).maybeSingle();
 if(returnError||!taxReturn)return NextResponse.json({error:'Return not found'},{status:404});
 const required=['employerEin','employerName','wages'];
 for(const k of required)if(!String(body[k]??'').trim())return NextResponse.json({error:`${k} is required`},{status:400});
 const row={tax_return_id:returnId,employer_ein:String(body.employerEin).trim(),employer_name:String(body.employerName).trim(),wages:money(body.wages),federal_withholding:money(body.federalWithholding)??0,social_security_wages:money(body.socialSecurityWages),social_security_tax:money(body.socialSecurityTax),medicare_wages:money(body.medicareWages),medicare_tax:money(body.medicareTax),state_code:String(body.stateCode||'').trim()||null,state_wages:money(body.stateWages),state_withholding:money(body.stateWithholding)};
 const {data,error}=await supabase.from('tax_w2_income').insert(row).select('id').single();
 if(error)return NextResponse.json({error:'Unable to save confirmed W-2'},{status:500});
 await supabase.from('tax_return_events').insert({tax_return_id:returnId,event_type:'w2_confirmed',event_data:{w2_id:data.id},created_by:user.id}).then(()=>{},()=>{});
 return NextResponse.json({success:true,w2Id:data.id});
}
