import axiosApi from "@lib/utils/api";
import { Property } from "@/lib/types/property";

async function bookmarkProperty(propertyId: string) {
  try {
    const res: { message: string; isBookmarked: boolean } = await axiosApi(
      `/bookmark`,
      "PUT",
      {
        id: propertyId,
      }
    );

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("bookmark failed:", error.message);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

async function fetchUserSavedProperties(): Promise<Property[] | null> {
  try {
    const res: Property[] = await axiosApi(`/bookmark`);
    return res as Property[];
  } catch (error) {
    console.log(error);
    return null; // <-- return null instead of nothing
  }
}

export { bookmarkProperty, fetchUserSavedProperties };
