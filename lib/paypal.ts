/* eslint-disable */

const paypal = require('@paypal/checkout-server-sdk');

// Set up PayPal environment (using Sandbox for testing)
const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

// Use the correct environment for production or sandbox
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

export const payPalClient = new paypal.core.PayPalHttpClient(environment);
