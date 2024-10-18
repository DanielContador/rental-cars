import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // You might want to specify the origin
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  const { userId } = auth();
  const { carId, priceDay, startDate, endDate, carName } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!carId) {
    return new NextResponse("Car ID is required", { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalAmount = Number(priceDay) * numberOfDays;
  const totalAmountStripe = Number(priceDay) * 100 * numberOfDays; // Assuming priceDay is in Euros

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
    quantity: 1,
    price_data: {
      currency: "EUR",
      product_data: {
        name: carName,
      },
      unit_amount: totalAmountStripe,
    },
  }];

  // Create order in the database
  const order = await db.orden.create({
    data: {
      carId: carId,
      userId: userId,
      status: "confirmed",
      totalAmount: totalAmount.toString(),
      orderDate: startDate,
      orderEndDate: endDate,
    },
  });

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
    metadata: {
      orderId: order.id,
      carId: carId,
      startDate: startDate,
      endDate: endDate,
      numberOfDays: numberOfDays.toString(),
    },
  });

  return new NextResponse(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: corsHeaders,
  });
}
