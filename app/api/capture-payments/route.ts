/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
const paypal = require('@paypal/checkout-server-sdk');

const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const payPalClient = new paypal.core.PayPalHttpClient(environment);

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl; // Utiliza nextUrl para obtener searchParams
  const token = searchParams.get('token');
  const payerId = searchParams.get('PayerID');
  const orderid = searchParams.get('ordenID');

  if (!token || !payerId || !orderid) {
    return NextResponse.json(
      { success: false, error: 'Token, PayerID, and orderId are required' },
      { status: 400 }
    );
  }

  const capturePaymentRequest = new paypal.orders.OrdersCaptureRequest(token);
  capturePaymentRequest.requestBody({});

  try {
    const response = await payPalClient.execute(capturePaymentRequest);
    await db.orden.update({
      where: { id: orderid },
      data: { estado: 'confirmed' },
    });
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation?success=true`
    );
  } catch (error) {
    console.error('Error capturing payment:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
