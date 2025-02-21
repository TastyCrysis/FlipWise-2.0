import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    process.env.VERCEL_ENV !== "preview" &&
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
