"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createQueryString } from "@lib/utils/searchParams";

export const PROPERTY_TYPES = {
  All: "All",
  Apartment: "Apartment",
  Studio: "Studio",
  Condo: "Condo",
  House: "House",
  CabinOrCottage: "Cabin Or Cottage",
  Loft: "Loft",
  Room: "Room",
  Other: "Other",
} as const;

export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];

const PropertySearchForm = () => {
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<PropertyType>(
    PROPERTY_TYPES.All
  );

  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location && propertyType === "All") {
      router.push("/properties");
      return;
    }

    const query = createQueryString({ location, propertyType });

    router.push(`/properties/search${query}`);
  };

  return (
    <form
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
      onSubmit={handleSearchSubmit}
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value?.trimStart())}
          placeholder="Enter Location (City, State, Zip, etc)"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          id="property-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value as PropertyType)}
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {Object.values(PROPERTY_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
