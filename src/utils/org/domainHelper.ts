import type { Organization, User } from "@prisma/client";
import type { Context } from "vm";
import { z } from "zod";
import type { OrganizationWithRelations } from "~/types/prismaTypes";
import { db } from "~/server/db";

export const domainSchema = z.string()
  .refine(
    (domain) => {
      const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      return domainRegex.test(domain);
    },
    {
      message: "Domain must be in the format of 'name.tld'",
    }
  );


export const addDomain = async (domain: string, orgID: string, userId: string ) => {
    
    const validatedDomain = domainSchema.parse(domain);

    if (!validatedDomain) {
        throw new Error("Invalid domain");
    }

    const existingDomain = await db.domain.findFirst({
        where: {
            domain: validatedDomain,
            organization: {
                id: orgID,
            },
        },
    });

    if (existingDomain) {
        throw new Error("Domain already exists");
    }
    
    const domainData = await db.domain.create({
        data: {
            domain: validatedDomain,
            user: {
                connect: {
                    id: userId,
                },
            },
            organization: {
                connect: {
                    id: orgID,
                },
            },
        },
    });

    return domain;
};