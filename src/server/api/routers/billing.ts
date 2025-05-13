import { z } from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import Stripe from "stripe";
import type { BillingEntity, PaymentPlan, PaymentPlanStatus } from "@prisma/client";
import { setUserInCache } from "~/lib/redis/userDataRedis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export const billingRouter = createTRPCRouter({
  createOrUpdateStripeCustomer: adminProcedure
    .input(
      z.object({
        billingName: z.string().min(1),
        invoiceEmail: z.string().email(),
        billingAddress: z.string().min(1),
        billingPostalCode: z.string().min(1),
        billingCity: z.string().min(1),
        billingCountry: z.string().min(1),
        taxID: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        invoiceEmail, 
        billingName, 
        billingAddress, 
        billingPostalCode, 
        billingCity, 
        billingCountry, 
        taxID
      } = input;
      

      console.log(ctx.session.user.organization!.id)
      const organizationId = ctx.session.user.organization?.id;
      
      if (!organizationId) {
        throw new Error("No organization found in session");
      }
      
      const organization = await db.organization.findUnique({
        where: {
          id: organizationId,
        },
        include: {          
          billingEntity: {
            select: {
              stripeCustomer: true,
              billingName: true,
              billingAddress: true,
              billingPostalCode: true,
              billingCity: true,
              billingCountry: true,
              taxId: true,
              invoiceEmail: true,
              paymentMethods: {
                select: {
                  stripePaymentMethodID: true,
                },
              },
            }
          }
        },
      });

      if (organization?.billingEntity?.paymentMethods.length! > 2) {
        throw new Error("You can only have 3 payment methods");
      }

      if (!organization) {
        throw new Error("Organization not found");
      }
      
      let stripeCustomerId: string;
      
      if (organization.billingEntity) {
        stripeCustomerId = organization.billingEntity.stripeCustomer;
                
        const stripeCustomer = await stripe.customers.update(stripeCustomerId, {
          email: invoiceEmail,
          name: billingName,
          address: {
            line1: billingAddress,
            postal_code: billingPostalCode,
            city: billingCity,
            country: billingCountry,
          },
          metadata: {
            organizationId,
            taxId: taxID || "",
          },
        });
        
        await db.billingEntity.update({
          where: {
            id: organization.billingEntityId!,
          },
          data: {
            stripeCustomer: stripeCustomer.id,
            billingName,
            billingAddress,
            billingPostalCode,
            billingCity,
            billingCountry,
            taxId: taxID || "",
            invoiceEmail,
          },
        });
      } 

      else {        
        const newStripeCustomer = await stripe.customers.create({
          email: invoiceEmail,
          name: billingName,
          address: {
            line1: billingAddress,
            postal_code: billingPostalCode,
            city: billingCity,
            country: billingCountry,
          },
          metadata: {
            organizationId,
            taxId: taxID || "",
          },
        });
        
        stripeCustomerId = newStripeCustomer.id;
                
        const billingEntity = await db.billingEntity.create({
          data: {
            stripeCustomer: stripeCustomerId,
            billingName,
            billingAddress,
            billingPostalCode,
            billingCity,
            billingCountry,            
            taxId: taxID || "",
            invoiceEmail,
            organization: {
              connect: { id: organizationId },
            },
          },
        });
        
        await db.organization.update({
          where: {
            id: organizationId,
          },
          data: {
            billingEntityId: billingEntity.id,
          },
        });
      }
      
      const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        payment_method_types: ["card", "sepa_debit", "us_bank_account", "link"],
        metadata: {
          organizationId,
        },
      });

      console.log("Setup intent created:", setupIntent)


      return {
        clientSecret: setupIntent,
        stripeCustomerId,
        isExistingCustomer: !!organization.billingEntity,
      };
    }),

    confirmSetupIntent: adminProcedure
    .input(
      z.object({
        setupIntentId: z.string(),
        paymentMethodId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { session } = ctx;
        const userId = session.user.id;
        
        
        const user = await db.user.findUnique({
          where: { id: userId },
          include: { organization: {
            include: { billingEntity: true }
          } },
        });
        
        if (!user || !user.organization) {
          throw new Error("User or organization not found");
        }
        
        if (!user.organization.billingEntity?.stripeCustomer) {
          throw new Error("No Stripe customer associated with this organization");
        }
        
        const setupIntent = await stripe.setupIntents.retrieve(input.setupIntentId);
        
        if (setupIntent.status !== "succeeded") {
          throw new Error(`Setup intent is not successful. Status: ${setupIntent.status}`);
        }
        
        await stripe.paymentMethods.attach(input.paymentMethodId, {
          customer: user.organization.billingEntity?.stripeCustomer,
        });
        
        await stripe.customers.update(user.organization.billingEntity?.stripeCustomer, {
          invoice_settings: {
            default_payment_method: input.paymentMethodId,
          },
        });
        
        await db.billingEntity.update({
          where: { id: user.organization.billingEntity.id },
          data: {
            updatedAt: new Date(),
            paymentMethods: {
              create: {
                stripePaymentMethodID: input.paymentMethodId as string,
              },
            },
          },
        });
        
        return {
          success: true,
          message: "Payment method successfully attached to customer",
        };
      } catch (error) {
        console.error("Error confirming setup intent:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to confirm payment method"
        );
      }
    }),

    getPaymentMethods: adminProcedure
    .query(async ({ ctx }) => {
      const { session } = ctx;
      const userId = session.user.id;
      
      if (!userId) {
        throw new Error("No user found in session");
      }
      
      if (ctx.session.user.role !== "admin") {
        throw new Error("Only admins can access this route");
      }
      
      const user = ctx.session.user;

      if (!user || !user.organization) {
        throw new Error("User or organization not found");
      }
      
      if (!user.organization.billingEntity?.stripeCustomer) {
        throw new Error("No Stripe customer associated with this organization");
      }
      
      const paymentMethods = await stripe.paymentMethods.list({
        customer: user.organization.billingEntity?.stripeCustomer,
      });
      
      return paymentMethods.data;
    }),

    getInvoices: adminProcedure
    .query(async ({ ctx }) => {
      const { session } = ctx;
      const userId = session.user.id;
      
      if (!userId) {
        throw new Error("No user found in session");
      }
      
      if (ctx.session.user.role !== "admin") {
        throw new Error("Only admins can access this route");
      }
      
      const user = ctx.session.user;

      if (!user || !user.organization) {
        throw new Error("User or organization not found");
      }
      
      if (!user.organization.billingEntity?.stripeCustomer) {
        throw new Error("No Stripe customer associated with this organization");
      }
      
      const invoices = await stripe.invoices.list({
        customer: user.organization.billingEntity?.stripeCustomer,
      });
      
      return invoices.data;
    }),

    handleBillingPlanConfirm: adminProcedure
    .mutation(async ({ ctx }) => {
      const organization = await db.organization.findUnique({
        where: {
          id: ctx.session.user.organization?.id,
        },
        include: {          
          billingEntity: {
            select: {
              stripeCustomer: true,
              billingName: true,
              billingAddress: true,
              billingPostalCode: true,
              billingCity: true,
              billingCountry: true,
              billableSeats: true,
              taxId: true,
              invoiceEmail: true,
              paymentMethods: {
                select: {
                  stripePaymentMethodID: true,
                },
              },
            }
          }        
        },
      });

      const billingPlans = [
        {
          id: "team",
          minSeats: 1,
          maxSeats: 49,
        },
        {
          id: "growth",
          minSeats: 50,
          maxSeats: 99,
        },
        {
          id: "accelerate",
          minSeats: 100,
          maxSeats: 499,
        },        
      ]

      if (!organization) {
        throw new Error("Organization not found");
      }
      
      const billableSeats = organization.billingEntity?.billableSeats || 1;
     
      const plan = billingPlans.find(plan => plan.minSeats <= billableSeats && billableSeats <= plan.maxSeats) || billingPlans[0]!
      
      if (!plan) {
        throw new Error("No plan provided");
      }

      if (organization.billingEntity?.paymentMethods.length! === 0) {
        await db.organization.update({
          where: {
            id: organization.id,
          },
          data: {
            status: "active",
          },
        });

        await db.billingEntity.update({
          where: {
            id: organization.billingEntityId!,
          },
          data: {
            paymentPlanStatus: plan.id + "_pending_payment_information" as PaymentPlanStatus,
            updatedAt: new Date(),
          },
        });

        return {
          success: false,
          state: "no_payment_method",
          message: "No payment method found",
        };
      }
      else {
        await db.organization.update({
          where: {
            id: organization.id,
          },
          data: {
            status: "active",
          },
        });
      
      
        await db.billingEntity.update({
          where: {
            id: organization.billingEntityId!,
          },
          data: {
            paymentPlanStatus: plan.id as PaymentPlanStatus,
            updatedAt: new Date(),
          },
        });
      }
    })
});