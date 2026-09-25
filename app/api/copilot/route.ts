import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/auth';
import { generateAgriResponse } from '../../../lib/ai';
import { rateLimit } from '../../../lib/rate-limit';
import { answerAgriQuestion } from '../../../lib/agri-knowledge';

const schema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(12000)
  })).min(1).max(30),
});

export async function POST(req: Request) {
  let userQuery = '';
  let farms: any[] = [];
  let crops: any[] = [];
  let livestock: any[] = [];

  try {
    const u = await currentUser();
    const userId = u?.id || 'guest';
    const rl = rateLimit(`copilot:${userId}`, 60, 60_000);
    if (!rl.ok) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const b = schema.parse(await req.json());
    userQuery = [...b.messages].reverse().find(m => m.role === 'user')?.content || '';

    if (u && prisma) {
      try {
        [farms, crops, livestock] = await Promise.all([
          (prisma as any).farm.findMany({ where: { userId: u.id }, take: 10, orderBy: { createdAt: 'desc' } }).catch(() => []),
          (prisma as any).crop.findMany({ where: { userId: u.id }, take: 20, orderBy: { createdAt: 'desc' } }).catch(() => []),
          (prisma as any).livestock.findMany({ where: { userId: u.id }, take: 20, orderBy: { createdAt: 'desc' } }).catch(() => []),
        ]);
      } catch (err) {
        console.warn('Could not fetch user farm context from database:', err);
      }
    }

    // Try OpenAI first
    try {
      const result = await generateAgriResponse(b.messages, {
        farmer: { name: u?.name || 'Farmer', role: u?.role || 'farmer' },
        farms,
        crops,
        livestock
      });
      return NextResponse.json({ ...result, mode: 'copilot' });
    } catch (aiErr: any) {
      console.warn('OpenAI unavailable, falling back gracefully to Agronomy Knowledge Engine:', aiErr?.message);
      // Graceful fallback to verified Agronomy Knowledge Engine
      const fallback = answerAgriQuestion(userQuery, { farms, crops, livestock });
      return NextResponse.json({
        answer: `⚠️ [Notice: Live OpenAI cloud API quota is currently exceeded on the server. Showing verified agricultural guidance from Rythu Dost Agronomy Knowledge Engine:]\n\n${fallback.answer}`,
        sources: fallback.sources,
        mode: 'offline_knowledge',
        searched: false
      });
    }
  } catch (e: any) {
    console.error('Copilot API unexpected error:', e);
    const fallback = answerAgriQuestion(userQuery || 'General farming practices', { farms, crops, livestock });
    return NextResponse.json({
      answer: `⚠️ [Notice: AI service encountered a temporary network issue. Providing verified agronomy guidance:]\n\n${fallback.answer}`,
      sources: fallback.sources,
      mode: 'offline_knowledge',
      searched: false
    });
  }
}
