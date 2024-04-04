import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultUser } from "next-auth";
import axios from "axios";
import qs from "qs";
import { cookies } from "next/headers";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<DefaultUser | null> {
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
            cookies().set({
              name: "user-token",
              value: response.data.token,
              httpOnly: true,
              path: "/About",
            });
            return {
              id: user.customerId,
              name: user.fullname,
              email: user.email,
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
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, session }) {
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/SignIn",
  },
};
