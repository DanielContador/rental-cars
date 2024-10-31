import { NextResponse } from 'next/server'; // Import Next.js server response helper
import { db } from '@/lib/db'; // Import the Prisma database instance
import { auth } from '@clerk/nextjs/server'; // Import authentication middleware from Clerk
const paypal = require('@paypal/checkout-server-sdk'); // Import PayPal SDK

// PayPal environment configuration
const clientId = process.env.PAYPAL_CLIENT_ID; // Your PayPal client ID (from environment variables)
const clientSecret = process.env.PAYPAL_CLIENT_SECRET; // Your PayPal client secret (from environment variables)

// PayPal environment setup for Sandbox (for testing). For production, you would use LiveEnvironment
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const payPalClient = new paypal.core.PayPalHttpClient(environment);

// CORS headers to allow cross-origin requests (you might want to restrict this in production)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Consider restricting to specific origins
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
};

// Handler for POST requests
export async function POST(req: Request) {
  const { userId } = auth(); // Get the authenticated user ID from Clerk
  const { autoId, precioDia, ordenInicio, ordenFin, nombre } = await req.json(); // Extract request body

  // Check if the user is authenticated
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 }); // Return unauthorized if userId is not present
  }

  // Validate required fields
  if (!autoId) {
    return new NextResponse("Car ID is required", { status: 400 }); // Return bad request if autoId is missing
  }

  // Convert order start and end dates to JavaScript Date objects
  const start = new Date(ordenInicio); // Parse the start date
  const end = new Date(ordenFin); // Parse the end date

  // Calculate the number of days between the start and end dates
  const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)); // Calculate days

  // Total amount to charge for the reservation (price per day multiplied by the number of days)
  const montoTotal = Number(precioDia) * numberOfDays; // Total amount to be paid for the reservation

  // Fetch the car details from the database based on the car ID
  const car = await db.auto.findUnique({
    where: {
      id: autoId,
    },
  });

  // Handle case where the car ID does not exist in the database
  if (!car) {
    return new NextResponse("Car not found", { status: 404 }); // Return 404 if car doesn't exist
  }

  // Create a new order in the database
  const order = await db.orden.create({
    data: {
      autoId: autoId,
      nombreAuto: car.nombre, // Set the car's name from the fetched car details
      userId: userId, // Associate order with the authenticated user
      estado: "pendiente", // Set order status to "confirmed"
      montoTotal: montoTotal.toString(), // Store the total amount as a string in the database
      ordenInicio: start, // Store the start date (ensure it's in DateTime format)
      ordenFin: end, // Store the end date (ensure it's in DateTime format)
    },
  });

  // Create PayPal order
  const createOrderRequest = new paypal.orders.OrdersCreateRequest();
  createOrderRequest.requestBody({
    intent: 'CAPTURE', // Intent to capture payment immediately
    purchase_units: [
      {
        description: `Car Reservation: ${car.nombre}`, // Set description of the purchase
        amount: {
          currency_code: 'USD', // Use USD as the currency
          value: (montoTotal / 1000).toFixed(2), // Set the total amount, ensure it's formatted to two decimal places
        },
      },
    ],
    application_context: {
      // return_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation?orderId=${order.id}`, // Set return URL after successful payment
      // cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error?orderId=${order.id}`, // Set cancel URL if user cancels payment
      return_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/api/capture-payments?ordenID=${order.id}`,
      // Set return URL after successful payment
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/dashboard`, // Set cancel URL if user cancels payment
    },
  });

  let response;
  try {
    // Execute the PayPal order creation
    response = await payPalClient.execute(createOrderRequest);
  } catch (err) {
    // Handle PayPal order creation failure
    console.error('PayPal Order Creation Failed', err); // Log the error for debugging
    return new NextResponse('Failed to create PayPal order', { status: 500 }); // Return internal server error if PayPal order creation fails
  }

  // Find the approval URL from PayPal's response
  const approvalUrl = response.result.links.find((link: any) => link.rel === 'approve')?.href;

  // Handle case where the approval URL is not found
  if (!approvalUrl) {
    return new NextResponse('PayPal approval URL not found', { status: 500 }); // Return internal server error if no approval URL is found
  }

  // Return the PayPal approval URL to the client, allowing them to proceed with payment
  return NextResponse.json({ url: approvalUrl }, { headers: corsHeaders }); // Return the URL to the client
}
