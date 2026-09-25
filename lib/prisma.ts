import { PrismaClient } from '@prisma/client';

declare global { var __rsPrisma: PrismaClient | undefined; }

export const prisma = global.__rsPrisma ?? new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'] });
if (process.env.NODE_ENV !== 'production') global.__rsPrisma = prisma;

export function requireDatabase() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured. Connect a PostgreSQL database before using persistent features.');
  return prisma;
}
