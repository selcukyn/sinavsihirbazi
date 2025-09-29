import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { SessionPayload } from './types';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  // exp claim'i payload içinde zaten ayarlandığı için ek süre ayarı kaldırıldı.
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  // Eğer session cookie'si yoksa veya boşsa, doğrulama denemeden null dön.
  if (!session) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    // Hata durumunda (örn. geçersiz token, süresi dolmuş token) null dön.
    console.error('Failed to verify session:', error);
    return null;
  }
}

export async function createSession(payload: Omit<SessionPayload, 'expiresAt' | 'exp'>) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionPayload: SessionPayload = {
    ...payload,
    expiresAt: expiresAt,
  };
  
  // JWT standardı olan `exp` alanını saniye cinsinden ekle
  const sessionToEncrypt = { ...sessionPayload, exp: Math.floor(expiresAt.getTime() / 1000) };

  const session = await encrypt(sessionToEncrypt);

  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);
  return session;
}

export async function deleteSession() {
    cookies().delete('session');
}