import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from './lib/auth-middleware';

export async function middleware(request: NextRequest) {
  const authRedirect = await authMiddleware(request);
  if (authRedirect) {
    return authRedirect;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
