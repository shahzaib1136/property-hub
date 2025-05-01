import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/models/User";
import connectToDatabase from "@/config/database";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    maxAge: 4 * 24 * 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const existingUser = await UserModel.findOne({ email: profile?.email });

        if (!existingUser) {
          const newUser = new UserModel({
            email: profile?.email,
            username: profile?.name?.slice(0, 20),
            image: profile?.picture,
          });

          await newUser.save();
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      try {
        const userInDb = await UserModel.findOne({
          email: session?.user?.email,
        });

        if (userInDb) {
          session.user.id = userInDb._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
};
