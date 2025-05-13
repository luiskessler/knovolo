import type { OrgEmailTypes, UserEmailTypes } from "@prisma/client";
import { db } from "~/server/db";

type UserEmailCronJob<T> = {
    type: UserEmailTypes;
    entity: "user";
    timePeriod: number;
    action: (target: T) => Promise<void>;
  };
  
  type OrgEmailCronJob<T> = {
    type: OrgEmailTypes;
    entity: "organization";
    timePeriod: number;
    action: (target: T) => Promise<void>;
  };
  
  type EmailCronJob<T> = UserEmailCronJob<T> | OrgEmailCronJob<T>;
  

export const handleEmailCronJob = async <T>(emailCronJob: EmailCronJob<T>) => {
  const { type, timePeriod, action, entity } = emailCronJob;
  const now = new Date();
  const cutoff = new Date(now.getTime() - timePeriod);

  if (entity === "user") {
    const users = await db.userEmails.findMany({
      where: {
        type,
        createdAt: {
          lte: cutoff, // only users created before the cutoff
        },
      },
    });

    for (const user of users) {
      await action(user as T);
    }
  }

  if (entity === "organization") {
    const orgs = await db.organizationEmails.findMany({
      where: {
        type,
        createdAt: {
          lte: cutoff,
        },
      },
    });

    for (const org of orgs) {
      await action(org as T);
    }
  }
};
