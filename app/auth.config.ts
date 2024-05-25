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
      let isOnWelcome = nextUrl.pathname.startsWith('/welcome');
      let isOnMatcher = nextUrl.pathname.startsWith('/matcher');
      let isOnSignUp = nextUrl.pathname.startsWith('/signup');
      let isOnMyMatches = nextUrl.pathname.startsWith('/my-matches');
      let isOnMyMatchRequests = nextUrl.pathname.startsWith('/my-match-requests');
      let isOnMyMatchInvitations = nextUrl.pathname.startsWith('/my-match-invitations');

      if (isOnMyMatchInvitations) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/my-match-invitations', nextUrl));
      }

      if (isOnMyMatchRequests) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/my-match-requests', nextUrl));
      }

      if (isOnMyMatches) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/my-matches', nextUrl));
      }

      if (isOnSetup) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/setup', nextUrl));
      }

      if(isOnWelcome) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', nextUrl));
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
