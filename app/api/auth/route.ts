import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { createSession, hashPassword, verifyPassword, sessionCookieName } from '../../../lib/auth';

const schema = z.object({ name: z.string().trim().min(2).max(80).optional(), email: z.string().email(), password: z.string().min(8).max(100), mode: z.enum(['login','signup']) });

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const email = body.email.toLowerCase();
    let user = await prisma.user.findUnique({ where: { email } });
    if (body.mode === 'signup') {
      if (user) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
      user = await prisma.user.create({ data: { name: body.name || 'Farmer', email, passwordHash: hashPassword(body.password), role: 'farmer' } });
    } else {
      if (!user || !verifyPassword(body.password, user.passwordHash)) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    const token = await createSession(user.id);
    const res = NextResponse.json({ user: { id:user.id, name:user.name, email:user.email, role:user.role } });
    res.cookies.set(sessionCookieName, token, { httpOnly:true, sameSite:'lax', secure:process.env.NODE_ENV==='production', path:'/', maxAge:1209600 });
    return res;
  } catch (e:any) {
    const message = e?.message || 'Authentication failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
