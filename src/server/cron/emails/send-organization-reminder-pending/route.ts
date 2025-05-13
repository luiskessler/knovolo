import type { NextRequest } from "next/server";
import { sendOrganizationSevenDayVerifyReminder } from "~/lib/email/services/sendOrganizationSevenDayVerifyReminder";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
    const cutoff = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  
    const companies = await db.organization.findMany({
      where: {
        createdAt: {
          lte: cutoff,
        },
        status: {
          not: "trial",
        },
      },
    });
  
    for (const company of companies) {
      console.log("Performing action for company:", company);
      await sendOrganizationSevenDayVerifyReminder({ org: company });
    }
  };
  