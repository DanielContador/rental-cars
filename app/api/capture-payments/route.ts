import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Your database import if needed
import { auth } from '@clerk/nextjs/server';
const paypal = require('@paypal/checkout-server-sdk');

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const payPalClient = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  const { token, payerId } = await req.json();

  if (!token || !payerId) {
    return NextResponse.json({ success: false, error: 'Token and PayerID are required' }, { status: 400 });
  }

  const capturePaymentRequest = new paypal.orders.OrdersCaptureRequest(token);
  capturePaymentRequest.requestBody({});

  try {
    const response = await payPalClient.execute(capturePaymentRequest);
    if (response.statusCode === 200) {
      return NextResponse.json({ success: true, data: response.result });
    } else {
      return NextResponse.json({ success: false, error: response.result }, { status: 400 });
    }
  } catch (error) {
    console.error('Error capturing payment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
