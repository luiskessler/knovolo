import type { Organization } from "@prisma/client";
import { sendEmail } from "../emailHelpers/sendEmail";
import { db } from "~/server/db";
import { getAdminEmailsFromOrg } from "../emailHelpers/getAdminEmailsFromOrg";

export const sendOrganizationSevenDayVerifyReminder = async ({org} : {org: Organization}) => {
    const text = `test`;
    const html = `test`;

    const emailsResult = await getAdminEmailsFromOrg(org);

  if ("status" in emailsResult) {
    return { status: emailsResult.status, message: emailsResult.message };
  }

  const email = emailsResult;

  return await sendEmail({
    to: email,
    subject: `Your Organization on Knovolo has been unverified for 7 days`,
    text,
    html,
    type: "orgReminderActivationSevenDays",
    entity: org,
  });
}