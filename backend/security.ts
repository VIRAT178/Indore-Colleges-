import {createHash} from 'node:crypto';

type AdminSession = {
  expiresAt: number;
  passwordFingerprint: string;
};

export class AdminSessionStore {
  private readonly sessions = new Map<string, AdminSession>();

  issue(token: string, expiresAt: number, passwordFingerprint: string) {
    this.sessions.set(token, {expiresAt, passwordFingerprint});
  }

  isValid(token: string, now: number, passwordFingerprint: string | null) {
    const session = this.sessions.get(token);
    if (!session) return false;
    if (!passwordFingerprint || session.passwordFingerprint !== passwordFingerprint || session.expiresAt <= now) {
      this.sessions.delete(token);
      return false;
    }
    return true;
  }

  revoke(token: string) {
    this.sessions.delete(token);
  }
}

export function getAdminPasswordFingerprint(password: string | undefined) {
  if (!password?.trim()) return null;
  return createHash('sha256').update(password).digest('hex');
}

export function hashSessionToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

type OtpCollection = {
  findOneAndDelete(query: {
    email: string;
    otp: string;
    expiresAt: {$gt: Date};
  }): Promise<unknown>;
};

export async function consumeIssuedOtp(collection: OtpCollection, email: string, otp: string, now = new Date()) {
  const consumed = await collection.findOneAndDelete({
    email,
    otp,
    expiresAt: {$gt: now},
  });
  return Boolean(consumed);
}
