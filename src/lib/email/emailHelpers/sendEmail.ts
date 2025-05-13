import { OrgEmailTypes, UserEmailTypes, type Organization, type User } from '@prisma/client'; // Import types
import { db } from '~/server/db';
import nodemailer from 'nodemailer';


function isOrganization(entity: Organization | User): entity is Organization {
  return (entity as Organization).id !== undefined && (entity as Organization).name !== undefined;
}

function isUser(entity: Organization | User): entity is User {
  return (entity as User).email !== undefined && (entity as User).id !== undefined;
}
export type EmailInputType<T extends Organization | User> = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  entity: T;
  type: T extends Organization ? OrgEmailTypes : UserEmailTypes; 
};

export const sendEmail = async <T extends Organization | User>({
  to,
  subject,
  text,
  html,
  type,
  entity,
}: EmailInputType<T>) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const recipients = Array.isArray(to) ? to : [to];

  if (isOrganization(entity)) {
    await db.organizationEmails.create({
      data: {
        type: type as OrgEmailTypes,
        organization: {
          connect: { id: entity.id },
        },
        createdAt: new Date(Date.now()),
      },
    });
  } else if (isUser(entity)) {
    await db.userEmails.create({
      data: {
        type: type as UserEmailTypes,
        user: {
          connect: { id: entity.id },
        },
        createdAt: new Date(Date.now()),
      },
    });
  }

  try {
    const results = await Promise.all(
      recipients.map(async (recipient) => {
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: recipient,
          subject,
          text,
          html,
        };

        return transporter.sendMail(mailOptions);
      })
    );

    return { status: 200, message: 'Email sent successfully.' };
  } catch (error) {
    return { status: 400, message: 'Something went wrong.' };
  }
};
