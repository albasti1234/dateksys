import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Skip: api routes, Next.js internals, files with extensions,
    // and /demos/* (self-contained static HTML demos with no locale)
    '/((?!api|_next|_vercel|demos|.*\\..*).*)'
  ]
}
