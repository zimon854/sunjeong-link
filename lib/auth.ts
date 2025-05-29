import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import KakaoProvider from "next-auth/providers/kakao";

interface User {
  id: string;
  email: string | null;
  name: string | null;
  password: string | null;
}

interface CredentialsAuth {
  email: string;
  password: string;
}

export const authConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials: any) {
        return {
          id: credentials?.email || "1",
          email: credentials?.email || "test@example.com",
          name: credentials?.email ? credentials.email.split('@')[0] : "test",
        };
      }
    })
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID!,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    // }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
}; 