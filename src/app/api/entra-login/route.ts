import { NextRequest } from 'next/server'
import { signIn } from '@/auth'

/**
 * This route allows us to sign in using the entra-pkce provider directly
 * rather than showing an interim page with a sign in button.
 */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const callbackUrl = searchParams.get('callbackUrl')
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  await signIn('entra-pkce', { redirectTo: callbackUrl! })
}
