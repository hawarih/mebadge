import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './config/languages'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
} 