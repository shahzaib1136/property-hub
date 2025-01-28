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

export { fetchProperties, fetchProperty };
