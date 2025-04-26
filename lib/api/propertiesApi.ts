import { Property } from "@lib/types/property";

import axiosApi from "@lib/utils/api";

// Fetch all properties
async function fetchProperties() {
  try {
    const res: Property[] = await axiosApi("/properties");

    return res;
  } catch (error) {
    console.log(error);
  }
}

// Fetch single property
async function fetchProperty(id: string) {
  try {
    const res: Property = await axiosApi<Property>(`/properties/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
}

async function addProperty(data: Partial<Property> | FormData) {
  try {
    const res: Property = await axiosApi<Property>(
      "/properties",
      "POST",
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add property failed:", error.message);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

// Fetch user properties
async function fetchUserProperties(userId: string) {
  try {
    const res: Property[] = await axiosApi<Property[]>(
      `/properties/user/${userId}`
    );

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch properties for user.", error.message);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

// Fetch user properties
async function deleteUserProperty(propertyId: string) {
  try {
    const res: Property[] = await axiosApi<Property[]>(
      `/properties/${propertyId}`,
      "DELETE"
    );

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch properties for user.", error.message);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

export {
  fetchProperties,
  fetchProperty,
  addProperty,
  fetchUserProperties,
  deleteUserProperty,
};
