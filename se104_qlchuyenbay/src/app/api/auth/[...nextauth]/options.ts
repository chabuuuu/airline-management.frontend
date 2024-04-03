import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string; role: string };
  }
  interface User extends DefaultUser {
    role: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/customer/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role ?? "defaultUserRole";
      return token;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/SignIn",
  },
};
