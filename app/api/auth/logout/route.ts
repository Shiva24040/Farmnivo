import { NextResponse } from 'next/server';
import { clearCurrentSession, sessionCookieName } from '../../../../lib/auth';
export async function POST() { await clearCurrentSession(); const r=NextResponse.json({ok:true}); r.cookies.set(sessionCookieName,'',{httpOnly:true,path:'/',maxAge:0}); return r; }
