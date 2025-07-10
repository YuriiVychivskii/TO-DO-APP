import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');

  if (!token) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/lists', '/lists/:path*'],
};
