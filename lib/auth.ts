import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const COOKIE = 'rythu_sarvam_session';
const secret = () => process.env.AUTH_SECRET || '';

export function assertAuthConfig() {
  if (!secret() || secret().length < 32) throw new Error('AUTH_SECRET must be configured with at least 32 characters.');
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.');
}

export function hashPassword(password: string) {
  assertAuthConfig();
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, `${secret()}:${salt}`, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  assertAuthConfig();
  const [salt, expected] = stored.split(':');
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(password, `${secret()}:${salt}`, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

export function hashToken(token: string) { return crypto.createHash('sha256').update(`${secret()}:${token}`).digest('hex'); }
export function createRawToken() { return crypto.randomBytes(32).toString('hex'); }

export async function createSession(userId: string) {
  assertAuthConfig();
  const raw = createRawToken();
  await prisma.session.create({ data: { userId, tokenHash: hashToken(raw), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) } });
  return raw;
}

export async function currentUser() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw || !process.env.DATABASE_URL) return null;
  const session = await prisma.session.findUnique({ where: { tokenHash: hashToken(raw) }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return null;
  return session.user;
}

export async function clearCurrentSession() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (raw && process.env.DATABASE_URL) await prisma.session.deleteMany({ where: { tokenHash: hashToken(raw) } });
}

export const sessionCookieName = COOKIE;
