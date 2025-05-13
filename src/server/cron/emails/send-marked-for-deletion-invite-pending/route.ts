import type { NextRequest } from "next/server";
import { sendOrganizationSevenDayVerifyReminder } from "~/lib/email/services/sendOrganizationSevenDayVerifyReminder";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
    const orgs = await db.organization.findMany({
        where: {
            status: "pending",
            createdAt: {
                lt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
            },
        },
        include: {
            emails: true,
        }
    });

    for (const org of orgs) {
        const hasReminderEmail = org.emails.some(email => 
            email.type === "orgReminderActivationSevenDays"
        );   
        if (hasReminderEmail) {
            return
        }
        
        await sendOrganizationSevenDayVerifyReminder({org});
    } 
}