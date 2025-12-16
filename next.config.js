// These represent sensible security headers, to prevent the most common web vulnerabilities.
// https://nextjs.org/docs/advanced-features/security-headers
const securityHeaders = [
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'none'",
      // Allow connections to the application's domain, to data URLs and to Microsoft's login URLs for SSO.
      "connect-src 'self' data: https://login.microsoftonline.com",
      "font-src 'self' https://cdn.sainsburys.co.uk https://cdn.argos.co.uk https://cdn.habitat.co.uk https://cdn.tu.co.uk",
      "img-src 'self' data: https:",
      // unsafe-inline and unsafe-eval are required here to use the application in development mode.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "manifest-src 'self'",
      // unsafe-inline is required here to use the application in development mode.
      "style-src 'self' 'unsafe-inline'",
      "object-src 'none'",
      "prefetch-src 'self'",
    ].join('; '),
  },
  {
    key: 'Permissions-Policy',
    value:
      'accelerometer=(), autoplay=(), camera=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), screen-wake-lock=(), xr-spatial-tracking=()',
  },
  { key: 'Referrer-Policy', value: 'same-origin' },
  { key: 'Cache-Control', value: 'private, no-cache, no-store' },
]

module.exports = {
  // Disable the X-Powered-By header, which will flag on most pentest reports.
  poweredByHeader: false,
  // Enable React Strict mode. https://reactjs.org/docs/strict-mode.html
  reactStrictMode: true,
  transpilePackages: ['@sainsburys-tech/nextjs-support'],
  async headers() {
    const headers = securityHeaders

    // HSTS is important for deployed environments, but not when running locally.
    if (process.env.ENABLE_HSTS == 'true') {
      headers.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      })
    }

    return [{ source: '/(.*)', headers }]
  },
}
