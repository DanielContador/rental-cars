import { NextResponse } from 'next/server'; // Import Next.js server response helper
import { clerkClient } from "@clerk/clerk-sdk-node"; // Import Clerk SDK
import { auth } from '@clerk/nextjs/server'; // Import Clerk auth helper

// CORS headers to allow cross-origin requests (you might want to restrict this in production)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Consider restricting to specific origins
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
};

// Handler for GET requests
export async function GET(req: Request) {
  const { userId } = auth(); // Get the authenticated user ID from Clerk

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 }); // Return unauthorized if no userId
  }

  // Extract query parameters from URL
  const url = new URL(req.url); // Create a URL object from the request
  const userIds = url.searchParams.get('userIds'); // Get the userIds query parameter

  // Ensure userIds is present and valid
  if (!userIds || typeof userIds !== "string") {
    return new NextResponse("userIds parameter is required and must be a string.", { status: 400 });
  }

  const userIdsArray = userIds.split(",").filter((id) => id !== null && id !== undefined);

  try {
    const users = await Promise.all(
      userIdsArray.map(async (userId) => {
        try {
          // Fetch the user details using Clerk SDK
          const user = await clerkClient.users.getUser(userId);
          return { userId, fullName: user.fullName || "Unknown" }; // If fullName is not available, return "Unknown"
        } catch (error) {
          console.error("Error fetching user:", error);
          return { userId, fullName: "Unknown" }; // Return "Unknown" if there's an error fetching user
        }
      })
    );

    const userNames = users.reduce((acc, user) => {
      acc[user.userId] = user.fullName; // Map userIds to user names
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(userNames, { headers: corsHeaders }); // Return the user names in the response

  } catch (error) {
    console.error("Error fetching user names:", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Return 500 if something went wrong
  }
}
