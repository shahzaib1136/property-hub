import { NextResponse, NextRequest } from "next/server"; // Import necessary types
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Retrieve the session token from the request
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if session exists
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to login if no session
  }

  return NextResponse.next(); // Continue to the requested page
}

export const config = {
  matcher: ["/properties/add", "/properties/:id*"], // List of paths to protect
};
