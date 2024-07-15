import prisma from "@/db";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  roll_number?: string | null;
  role?: string | null;
  image?: string | null;
  public_id?: string | null;
  mobile_number?: string | null;
};

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true
    //   if (isAllowedToSignIn) {
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     return false
    //   }
    // },
    
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? '/' : "https://kalaam-nitrkl.vercel.app/";
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        roll_number: { label: "Roll Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { roll_number: credentials?.roll_number },
          select: {
            id: true,
            name: true,
            email: true,
            roll_number: true,
            role:true,
            image: true,
            public_id: true,
            mobile_number:true,
          },
        });

        if (user) {
          return { ...user, id: user.id.toString() };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
