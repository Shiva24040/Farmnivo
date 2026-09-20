import {NextResponse} from 'next/server'; import {cookies} from 'next/headers'; import {clearSession} from '../../../../lib/store';
export async function POST(){const c=await cookies();clearSession(c.get('farmnivo_session')?.value);const r=NextResponse.json({ok:true});r.cookies.set('farmnivo_session','',{httpOnly:true,path:'/',maxAge:0});return r}
