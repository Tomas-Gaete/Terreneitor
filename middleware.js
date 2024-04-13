// import { i18nRouter } from 'next-i18n-router';
// import i18nConfig from './i18nConfig';

// export function middleware(request) {
//   return i18nRouter(request, i18nConfig);
// }

// // applies this middleware only to files in the app directory
// export const config = {
//   matcher: '/((?!api|static|.*\\..*|_next).*)'
// };

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};