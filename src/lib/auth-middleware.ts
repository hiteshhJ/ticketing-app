import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import config from '@/config';

const identityLoginPathname = '/api/entra-login';

export const authMiddleware = async (request: NextRequest) => {
  const {
    nextUrl: { pathname, href },
  } = request;

  if (config.AUTH_PROTECTED_PATHS.test(pathname)) {
    const session = await auth();
    if (session) {
      return null;
    }

    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = identityLoginPathname;
    signInUrl.searchParams.set('callbackUrl', href);
    return NextResponse.redirect(signInUrl);
  }
};
