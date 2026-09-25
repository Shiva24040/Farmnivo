import { NextResponse } from 'next/server';
import { z } from 'zod';
import { explainWithWebSearch } from '../../../../lib/ai';

const schema = z.object({ query: z.string().trim().min(5).max(1200), location: z.string().trim().max(160).optional() });

export async function POST(req: Request) {
  try {
    const b = schema.parse(await req.json());
    const result = await explainWithWebSearch(`Find the latest official information relevant to this farmer question: ${b.query}`, b.location || 'India');
    return NextResponse.json({ ...result, mode: 'openai-web-search' });
  } catch (e: any) {
    const status = String(e?.message || '') === 'AI_PROVIDER_NOT_CONFIGURED' ? 503 : String(e?.message || '').includes('PROVIDER_429') ? 429 : 500;
    return NextResponse.json({ error: status === 503 ? 'OpenAI is not configured.' : 'Live scheme lookup is temporarily unavailable.' }, { status });
  }
}
