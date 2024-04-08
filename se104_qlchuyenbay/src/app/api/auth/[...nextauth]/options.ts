import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import qs from "qs";
import { cookies } from "next/headers";

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface CustomUser extends DefaultUser {
  name: string;
  email: string;
  id: string;
  token: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      id: string;
      token: string;
    } & DefaultSession;
  }

  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name: string;
    email: string;
    id: string;
    token: string;
  }
}
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<CustomUser | null> {
        try {
          const url = `${process.env.NEXT_PUBLIC_SERVER}/customer/login`;
          const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: url,
            headers: {},
            data: qs.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          };
          const response = await axios.request(config);

          if (response.status === 200) {
            const user = response.data.customer;
            // cookies().set({
            //   name: "Customer-Token",
            //   value: response.data.token,
            //   httpOnly: true,
            //   path: "/ProfilePage",
            // });
            return {
              name: user.fullname,
              email: user.email,
              id: user.customerId,
              token: response.data.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          token: user.token,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (session && token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            token: token.token,
          },
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/SignIn",
  },
};
