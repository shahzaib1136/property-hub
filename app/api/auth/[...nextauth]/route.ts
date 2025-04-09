import NextAuth, { Session, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/models/User";
import connectToDatabase from "@/config/database";

const authOptions: NextAuthOptions = {
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
    maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
    strategy: "jwt", // Using JWT-based session
  },
  callbacks: {
    // SignIn callback
    async signIn({ profile }) {
      try {
        // Connect to MongoDB
        await connectToDatabase();

        // Check if user exists
        const existingUser = await UserModel.findOne({ email: profile?.email });

        if (!existingUser) {
          // Save user if they don't exist
          const newUser = new UserModel({
            email: profile?.email,
            username: profile?.name?.slice(0, 20),
            image: profile?.picture,
          });

          await newUser.save();
        }

        // Allow sign-in
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    // Session callback
    async session({ session }: { session: Session }) {
      try {
        // Retrieve the user from the database using email
        const userInDb = await UserModel.findOne({
          email: session?.user?.email,
        });

        if (userInDb) {
          // Assign userId from DB to session
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

const handler = NextAuth(authOptions);

// API route handlers for Next.js
export { handler as GET, handler as POST };
