import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

// Define protected and public routes
const protectedRoutes = ['/', '/practice', '/admin'];
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Determine if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => 
    path === route || (route !== '/' && path.startsWith(route))
  );

  // Get session from cookie
  const sessionCookie = req.cookies.get('session')?.value;
  const session = await decrypt(sessionCookie);

  // 1. Redirect to login if user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect logged-in users away from the login page
  if (path === '/login' && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  
  // 3. Prevent non-admins from accessing the admin panel
  if (path.startsWith('/admin') && session?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
    // Match all paths except for static files, images, and the API
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
