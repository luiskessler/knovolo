import { resolveMx, resolveAny } from "dns/promises";
import { z } from "zod";

const freeEmailProviders = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
  "aol.com", "icloud.com", "protonmail.com", "zoho.com",
  "mail.com", "gmx.com"
]);

export async function isValidCustomEmail(email: string): Promise<boolean> {
  const emailSchema = z.string().email();
  if (email === "" || email === undefined) return false;

  try {
    emailSchema.parse(email);
    const domain = email.split("@")[1]!.toLowerCase();

    if (freeEmailProviders.has(domain)) return false;

    const mxRecords = await resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

export async function isValidWebsiteUrl(url: string): Promise<boolean> {
    try {
      const urlSchema = z.string().url();
      urlSchema.parse(url.startsWith("http") ? url : `https://${url}`);
  
      const hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
      const dnsRecords = await resolveAny(hostname);
  
      return dnsRecords.length > 0;
    } catch {
      return false;
    }
  }
  