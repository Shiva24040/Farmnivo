import {NextResponse} from 'next/server'; import {cookies} from 'next/headers'; import {getUserFromToken} from '../../../../lib/store';
export async function GET(){const c=await cookies();const u=getUserFromToken(c.get('farmnivo_session')?.value);return NextResponse.json({user:u?{id:u.id,name:u.name,email:u.email,role:u.role}:null})}
