import { Property } from "@lib/types/property";

import axiosApi from "@lib/utils/api";
import { createQueryString } from "@lib/utils/searchParams";

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

async function updateProperty(id: string, data: Partial<Property> | FormData) {
  try {
    const res: Property = await axiosApi<Property>(
      `/properties/${id}`,
      "PUT",
      data
    );

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add property failed:", error.message);
      throw new Error(error.message); // Now passing a string message
    }
  }
}

//Search properties
async function fetchSearchProperties({
  location,
  propertyType,
}: Record<string, string>) {
  const query = createQueryString({ location, type: propertyType });

  const url = `/properties/search${query}`;
  try {
    const res: Property[] = await axiosApi(url);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("fetch property failed:", error.message);
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
  updateProperty,
  fetchSearchProperties,
};
