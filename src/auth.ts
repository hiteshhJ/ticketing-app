import NextAuth from 'next-auth'
import Entra from 'next-auth/providers/microsoft-entra-id'
import config from '@/config'

const buttonStyle = {
  text: '#fff',
  bg: '#f06c00',
  logo: '',
  bgDark: '#f06c00',
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: config.AUTH_SECRET,
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user
    },
  },
  trustHost: true,
  providers: [
    Entra({
      id: 'entra-pkce',
      name: 'SSO',
      style: buttonStyle,
      clientId: config.AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID,
      authorization: { params: { prompt: 'login' } },
      issuer: config.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      client: {
        token_endpoint_auth_method: 'none',
      },
      checks: ['pkce'],
    }),
  ],
  session: { strategy: 'jwt' },
})
