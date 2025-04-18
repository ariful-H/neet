import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" || path === "/auth/login" || path === "/auth/register" || path === "/auth/forgot-password"

  // Check if user is logged in
  const isLoggedIn = request.cookies.has("medprep_auth") || request.cookies.has("medprep_session")

  // Redirect logic
  if (isPublicPath && isLoggedIn) {
    // If user is logged in and tries to access public path, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !isLoggedIn) {
    // If user is not logged in and tries to access protected path, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
}
