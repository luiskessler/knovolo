import type { Organization } from "@prisma/client";
import { db } from "~/server/db";

export const getAdminEmailsFromOrg = async (org: Organization) => {
 
     const organization = await db.organization.findFirst({
         where: {
             id: org.id,
         },
         include: {
             users: true
         }
     });
 
     if (!organization) {
         return ({status: 400, message: "Organization not found."});
     }
 
     const organizationAdmins = organization!.users.filter(user => user.role === "admin");
 
     return organizationAdmins.map(user => user.email);
};