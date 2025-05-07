import prisma from "@/lib/prisma";
import stripe from "@/lib/strip";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Signature is missing", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log(`Received event: ${event.type}`, event.data.object);

    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;

  if (!userId) {
    throw new Error("User ID is missing in session metadata");
  }

  (await clerkClient()).users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
    if (
      subscription.status === "active" ||
      subscription.status === "trialing" ||
      subscription.status === "past_due"
    ) {
      await prisma.$transaction(async (tx) => {
        const existingSubscription = await (tx as any)['userSubscription'].findUnique({
          where: {
            userId: subscription.metadata.userId,
          },
        }).catch(() => null);
  
        if (existingSubscription) {
          await (tx as any)['userSubscription'].update({
            where: {
              userId: subscription.metadata.userId,
            },
            data: {
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
              stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });
        } else {
          await tx.$executeRaw`
            INSERT INTO "user_subscriptions" (
              "id", 
              "userId", 
              "stripeSubscriptionId", 
              "stripeCustomerId", 
              "stripePriceId", 
              "stripeCurrentPeriodEnd", 
              "stripeCancelAtPeriodEnd", 
              "createdAt", 
              "updatedAt"
            ) 
            VALUES (
              ${crypto.randomUUID()}, 
              ${subscription.metadata.userId}, 
              ${subscription.id}, 
              ${subscription.customer as string}, 
              ${subscription.items.data[0].price.id}, 
              ${new Date(subscription.current_period_end * 1000)}, 
              ${subscription.cancel_at_period_end}, 
              ${new Date()}, 
              ${new Date()}
            )
          `;
        }
      });
    } else {
      await (prisma as any)['userSubscription'].deleteMany({
        where: {
          stripeCustomerId: subscription.customer as string,
        },
      });
    }
  }
  
  async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await (prisma as any)['userSubscription'].deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }