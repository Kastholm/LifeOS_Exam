// frontend/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Tillad login siden at være tilgængelig
  if (pathname === '/pages/login') {
    return NextResponse.next();
  }
  
  // Tjek om brugeren er autentificeret via cookie
  const isAuthenticated = request.cookies.get('auth')?.value === 'true';
  
  // Hvis ikke autentificeret, redirect til login med oprindelig URL
  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/pages/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Matcher kun monthbook routes
export const config = {
  matcher: [
    '/pages/monthbook/:path*', '/pages/notebook/:path*'  // Matcher alle routes under /pages/monthbook
  ],
};