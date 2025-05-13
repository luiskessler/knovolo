import type { NextRequest } from "next/server";

export function validateCronSecret(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  return authHeader === `Bearer ${secret}`;
}
