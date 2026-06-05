import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "joseymap_admin_session";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(input: string, expected: string): boolean {
  const inputHash = hashPassword(input);
  try {
    return timingSafeEqual(
      Buffer.from(inputHash, "hex"),
      Buffer.from(hashPassword(expected), "hex")
    );
  } catch {
    return false;
  }
}

export function getAdminToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "joseymap";
  return hashPassword(password);
}

export function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    return timingSafeEqual(
      Buffer.from(token, "hex"),
      Buffer.from(getAdminToken(), "hex")
    );
  } catch {
    return false;
  }
}
