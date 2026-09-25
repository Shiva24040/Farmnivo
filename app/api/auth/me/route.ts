import { NextResponse } from 'next/server';
import { currentUser } from '../../../../lib/auth';
export async function GET(){ const u=await currentUser(); return NextResponse.json({user:u?{id:u.id,name:u.name,email:u.email,role:u.role,createdAt:u.createdAt}:null}); }
