import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const getUserSession = async () => {
  try {
    const userSession = await getServerSession(authOptions);

    if (!userSession || !userSession.user) {
      return null;
    }

    return {
      user: userSession.user,
      userID: userSession.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
