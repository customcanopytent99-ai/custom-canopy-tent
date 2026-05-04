/** @format */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeClient } from "@/sanity/lib/client";
import { sendEmail } from "@/utils/email";
import { PaymentStatus, OrderStatus } from "@/helpers";
import { clearRemoteCart } from "@/app/actions/cart";

if (!process.env.NEXT_STRIPE_SECRET_KEY) {
  throw new Error("NEXT_STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);
const webhookSecret = process.env.NEXT_STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    console.log(`🔔 Received event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed":
        await handlePaymentSuccess(event.data.object as any);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as any);
        break;

      case "charge.refunded":
        await handleRefund(event.data.object as any);
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error(`❌ Webhook error: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

async function handlePaymentSuccess(session: any) {
  const { metadata, shipping_details } = session;
  const orderId = metadata?.orderId;
  const customerEmail = metadata?.customerEmail;

  if (!orderId) {
    console.warn("⚠️ Missing orderId in metadata");
    return;
  }

  try {
    const patchData: any = {
      paymentStatus: PaymentStatus.COMPLETED,
      orderStatus: OrderStatus.PROCESSING,
      submittedAt: new Date().toISOString(),
    };

    // Store shipping address if available from Stripe
    if (shipping_details) {
      patchData.shippingAddress = {
        firstName: shipping_details.name.split(' ')[0] || '',
        lastName: shipping_details.name.split(' ').slice(1).join(' ') || '',
        address: shipping_details.address.line1 + (shipping_details.address.line2 ? `, ${shipping_details.address.line2}` : ''),
        city: shipping_details.address.city,
        province: shipping_details.address.state,
        postalCode: shipping_details.address.postal_code,
        phone: session.customer_details?.phone || '',
      };
    }

    await writeClient
      .patch(orderId)
      .set(patchData)
      .commit();

    // Clear cart in Sanity
    if (customerEmail) {
      await clearRemoteCart(customerEmail);
      console.log(`🧹 Cart cleared for ${customerEmail}`);
    }

    // Send admin email
    await sendEmail(orderId, null, false);

    // Send customer email
    await sendEmail(orderId, customerEmail, true);

    console.log(`✅ Order ${orderId} marked as paid and emails sent`);
  } catch (err) {
    console.error(`❌ Failed to update order ${orderId}:`, err);
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  const orderId = paymentIntent.metadata?.orderId;
  if (!orderId) return;

  await writeClient
    .patch(orderId)
    .set({
      paymentStatus: PaymentStatus.FAILED,
      orderStatus: OrderStatus.CANCELLED,
    })
    .commit();

  console.log(`❌ Payment failed for order ${orderId}`);
}

async function handleRefund(charge: any) {
  const orderId = charge.metadata?.orderId;
  if (!orderId) return;

  await writeClient
    .patch(orderId)
    .set({
      paymentStatus: PaymentStatus.REFUNDED,
      orderStatus: OrderStatus.CANCELLED,
    })
    .commit();

  console.log(`💸 Refund processed for order ${orderId}`);
}
