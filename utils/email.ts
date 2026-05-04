/** @format */

import nodemailer from "nodemailer";
import { client } from "@/sanity/lib/client";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendEmail(
  orderId: string,
  toEmail: string | null = null,
  isCustomer: boolean = true,
) {
  try {
    // Fetch order details from Sanity
    const order = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]{
        ...,
        items[]{
          ...,
        }
      }`,
      { orderId },
    );

    if (!order) throw new Error("Order not found");

    const isAdmin = !isCustomer;
    const recipient = isAdmin ? process.env.EMAIL_FROM : toEmail;

    if (!recipient) {
      console.warn("No recipient email provided");
      return;
    }

    const subject = isAdmin
      ? `New Order Received: #${order.orderNumber}`
      : `Order Confirmation: #${order.orderNumber}`;

    const itemsHtml = order.items
      .map(
        (item: any) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0;">
            <p style="margin: 0; font-weight: bold;">${item.productName}</p>
            <p style="margin: 0; font-size: 0.9em; color: #666;">
              Size: ${item.size} | Color: ${item.color || "Default"}
            </p>
          </td>
          <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px 0; text-align: right;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>
      `,
      )
      .join("");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #000; padding: 20px; text-align: center; color: white;">
          <h1>${isAdmin ? "New Order Alert" : "Thank You For Your Order!"}</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${order.customerName || "Customer"},</p>
          ${
            isAdmin
              ? `<p>A new order has been placed on Custom Tent Canopy.</p>`
              : `<p>We've received your order and are getting it ready. You'll receive another email when it ships!</p>`
          }
          
          <h3 style="border-bottom: 2px solid #000; padding-bottom: 5px;">Order Summary</h3>
          <p><strong>Order Number:</strong> #${order.orderNumber}</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead style="background-color: #f9f9f9;">
              <tr>
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">$${order.totalAmount.toFixed(
                  2,
                )}</td>
              </tr>
            </tfoot>
          </table>

          <h3 style="border-bottom: 2px solid #000; padding-bottom: 5px; margin-top: 20px;">Shipping Details</h3>
          <p style="margin: 5px 0;">${order.customerName}</p>
          ${
            order.shippingAddress
              ? `
          <p style="margin: 5px 0;">${order.shippingAddress.address}</p>
          <p style="margin: 5px 0;">${order.shippingAddress.city}, ${
            order.shippingAddress.province
          } ${order.shippingAddress.postalCode}</p>
          `
              : ""
          }
          <p style="margin: 5px 0;">Phone: ${order.customerPhone}</p>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 0.8em; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Custom Tent Canopy. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Custom Tent Canopy <${process.env.EMAIL_FROM}>`,
      to: recipient,
      subject: subject,
      html: emailHtml,
    });

    console.log(`Email sent successfully to ${recipient}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendLeadEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tentSize?: string;
  quantity?: string;
  useCase?: string;
  message?: string;
}) {
  try {
    const adminEmail = process.env.EMAIL_FROM;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #000; padding: 20px; text-align: center; color: white;">
          <h1>New Quote Request</h1>
        </div>
        <div style="padding: 20px;">
          <p><strong>From:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
          <p><strong>Company:</strong> ${formData.company || "N/A"}</p>
          <p><strong>Tent Size:</strong> ${formData.tentSize || "N/A"}</p>
          <p><strong>Quantity:</strong> ${formData.quantity || "N/A"}</p>
          <p><strong>Use Case:</strong> ${formData.useCase || "N/A"}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #000;">
            <p style="margin-top: 0;"><strong>Message/Details:</strong></p>
            <p style="white-space: pre-wrap;">${formData.message || "No message provided."}</p>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 0.8em; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Custom Tent Canopy. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Custom Tent Canopy <${process.env.EMAIL_FROM}>`,
      to: adminEmail,
      subject: `New Lead: ${formData.name} - ${formData.tentSize || "Quote Request"}`,
      html: emailHtml,
    });

    console.log(`Lead email sent successfully to ${adminEmail}`);
  } catch (error) {
    console.error("Error sending lead email:", error);
  }
}
