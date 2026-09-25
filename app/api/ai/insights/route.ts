import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { currentUser } from '../../../../lib/auth';
import { generateFarmInsight } from '../../../../lib/ai';

export async function GET() {
  try {
    const u = await currentUser();
    if (!u) {
      return NextResponse.json({ insight: null, note: 'Guest mode' });
    }

    let farms: any[] = [];
    let crops: any[] = [];
    let livestock: any[] = [];

    if (prisma) {
      try {
        [farms, crops, livestock] = await Promise.all([
          (prisma as any).farm.findMany({ where: { userId: u.id }, take: 10, orderBy: { createdAt: 'desc' } }).catch(() => []),
          (prisma as any).crop.findMany({ where: { userId: u.id }, take: 20, orderBy: { createdAt: 'desc' } }).catch(() => []),
          (prisma as any).livestock.findMany({ where: { userId: u.id }, take: 20, orderBy: { createdAt: 'desc' } }).catch(() => []),
        ]);
      } catch (err) {}
    }

    try {
      const result = await generateFarmInsight({ farms, crops, livestock, note: 'No live sensor data was supplied; do not invent sensor readings.' });
      return NextResponse.json({ ...result, mode: 'openai' });
    } catch (aiErr) {
      return NextResponse.json({ insight: null, note: 'AI insight unavailable, using dashboard defaults' });
    }
  } catch (e: any) {
    return NextResponse.json({ insight: null, note: 'AI insight unavailable' });
  }
}
