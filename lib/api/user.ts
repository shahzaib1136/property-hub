import axiosApi from "@lib/utils/api";

interface IUser {
  name: string;
  email: string;
  image?: string;
  bookmarks: string[];
  id: string;
}

async function fetchUser(id: string): Promise<IUser | null> {
  try {
    const res: IUser = await axiosApi(`/user/${id}`);
    return res as IUser;
  } catch (error) {
    console.log(error);
    return null; // <-- return null instead of nothing
  }
}

export { fetchUser };
