import type { BillingEntity, Organization, OrganizationStatus } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string ;
      email?: string;
      organization?: {
        id: string;
        name: string;
        slug: string;
        status: OrganizationStatus;
        billingEntity?: {
          stripeCustomer: string;          
        } | null;        
      };
      role?: string;
      apiKey?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    organization?: {
      id: string;
      name: string;
      slug: string;
      status: OrganizationStatus;
      billingEntity?: {
        stripeCustomer: string;
        billingName: string;
        billingAddress: string;
        billingPostalCode: string;
        billingCity: string;
        billingCountry: string;
        taxId: string;
        invoiceEmail: string;
        paymentMethods: {
          stripePaymentMethodID: string;
        }[];
      } | null;        
    };
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    org?: {
      id: string;
      name: string;
      slug: string;
      status: OrganizationStatus;
      billingEntity?: {
        stripeCustomer: string;
        billingName: string;
        billingAddress: string;
        billingPostalCode: string;
        billingCity: string;
        billingCountry: string;
        taxId: string;
        invoiceEmail: string;
        paymentMethods: {
          stripePaymentMethodID: string;
        }[];
      } | null;        
    }
    role?: string;
    apiKey?: string;
  }
}
