import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

// Define public routes that don't require authentication
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(path);

  // Get session from cookie
  const sessionCookie = req.cookies.get('session')?.value;
  const session = await decrypt(sessionCookie);

  // If it's a public route, no action is needed unless a logged-in user tries to access login page
  if (isPublicRoute) {
    if (path === '/login' && session?.userId) {
      // Redirect logged-in users away from the login page
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.next();
  }

  // At this point, the route is a protected route.
  // 1. Redirect to login if user is not authenticated.
  if (!session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Prevent non-admins from accessing the admin panel.
  if (path.startsWith('/admin') && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // If all checks pass, allow the request to proceed.
  return NextResponse.next();
}

export const config = {
  // Match all paths except for static files, images, and the API
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
