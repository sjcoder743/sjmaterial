import { createHmac } from "crypto";
import { cookies } from "next/headers";

const AUTH_COOKIE = "sjmaterial_session";
const AUTH_SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

export type SessionPayload = {
  sub: string;
  email: string;
  role: "user" | "admin";
  exp: number;
};

function base64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string) {
  return createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">, maxAgeSec = 60 * 60 * 24 * 7) {
  const fullPayload: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + maxAgeSec,
  };
  const encoded = base64url(JSON.stringify(fullPayload));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  if (sign(encoded) !== signature) return null;

  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString()) as SessionPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export const authCookieName = AUTH_COOKIE;
