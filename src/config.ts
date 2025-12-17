/* eslint-disable no-process-env */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

const config = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID: process.env.AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID,
  AUTH_MICROSOFT_ENTRA_ID_ISSUER: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID}/v2.0`,
  AUTH_PROTECTED_PATHS: /(\/admin|\/profile)/,
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8081',
  get EXAMPLE() {
    // getter example
    return process.env.EXAMPLE || 'Hello there!'
  },
}

export default config
