import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcrypt-ts';
import { authConfig } from 'app/auth.config';
import { createUser, getUserBase, updateUserBaseLastLogin } from '../lib/db/user_db';
import { expireSessionUser } from '@/lib/services/session.service';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let user = await getUserBase(email);
        if (!user) return null;
        let passwordsMatch = await compare(password, user.password!);
        if (passwordsMatch) return user as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async signIn({ user }) {
      // If user does not exist, create a new user
      if (user.email) {
        const dbUser = await getUserBase(user.email);
        if (!dbUser) {
          await createUser(user, '');
        } else {
          // Update lastLogin:
          await updateUserBaseLastLogin(dbUser);
        }
      } else {
        throw new Error(`No email provided for user: ${JSON.stringify(user)}`);
      }
    },
    async signOut(event) {
      console.log('User signed out:', event);
      expireSessionUser();
    },
  }
});
