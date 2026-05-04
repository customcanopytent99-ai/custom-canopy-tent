/** @format */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client, writeClient } from "@/sanity/lib/client";

if (!process.env.NEXT_STRIPE_SECRET_KEY) {
  throw new Error(
    "NEXT_STRIPE_SECRET_KEY is not defined in environment variables",
  );
}

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    // Fetch order from Sanity to get items and totals
    const order = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]`,
      { orderId },
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Create line items for Stripe
    const lineItems = order.items.map((item: any) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.productName || item.name,
          description: `${item.size || ''}${item.color ? ` | ${item.color}` : ''}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a separate line item if needed
    if (order.shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "cad",
          product_data: {
            name: "Shipping",
          },
          unit_amount: Math.round(order.shipping * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.AUTH_URL}/checkout/success?orderId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.AUTH_URL}/cart?canceled=true`,
      metadata: {
        orderId: order._id,
        customerEmail: order.customerEmail,
        orderNumber: order.orderNumber,
      },
      customer_email: order.customerEmail,
    });

    // Update order with stripeSessionId using writeClient
    await writeClient
      .patch(orderId)
      .set({ stripeSessionId: session.id })
      .commit();

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
