import { Prisma } from "@prisma/client";

export const questionWithRelations = Prisma.validator<Prisma.QuestionInclude>()({
  author: {
    select: {
      id: true,
      name: true,
      surname: true,
    },
  },
  organization: true,
  answers: {
    include: {
      author: {
        select: {
          id: true,
          name: true,
          surname: true,
        },
      },
      votes: true,
      parent: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          }
        }
      },
      replies: true
    }
  },
  votes: true,
});

export type QuestionWithRelations = Prisma.QuestionGetPayload<{
  include: typeof questionWithRelations;
}>;

export const organizationWithRelations = Prisma.validator<Prisma.OrganizationInclude>()({
  users: {
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      role: true,
      status: true,
    },
  },
  Path: {
    select: {
      id: true,
      name: true,
      category: true,
      rating: true,
      pathData: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
          role: true,
          status: true,
        },
      },
    }
  },
  Domain: {
    select: {
      id: true,
      domain: true,
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
          role: true,
          status: true,
        },
      },
    } 
  },
}); 

export type OrganizationWithRelations = Prisma.OrganizationGetPayload<{
  include: typeof organizationWithRelations;
}>;

export const domainWithRelations = Prisma.validator<Prisma.DomainInclude>()({
  user: {
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      role: true,
      status: true,
    },
  },
})

export type DomainWithRelations = Prisma.DomainGetPayload<{
  include: typeof domainWithRelations;
}>;