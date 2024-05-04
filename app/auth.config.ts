import { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }): Promise<boolean | Response> {
      let isLoggedIn = !!auth?.user;
      let isOnSetup = nextUrl.pathname.startsWith('/setup');
      let isOnMatcher = nextUrl.pathname.startsWith('/matcher');
      let isOnSignUp = nextUrl.pathname.startsWith('/signup');

      if (isOnSetup) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/setup', nextUrl));
      }

      if (isOnSignUp) {
        if (isLoggedIn) return Response.redirect(new URL('/matcher', nextUrl));
        return true;
      }

      if (isOnMatcher) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/matcher', nextUrl));
      }

      return true;
    },
  },
};
