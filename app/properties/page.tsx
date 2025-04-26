import React from "react";

import { Property } from "@lib/types/property";

import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@lib/api/propertiesApi";

const Properties = async () => {
  const properties = (await fetchProperties()) || [];

  const sortedProperties = properties.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // Fallback to epoch if undefined
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0); // Fallback to epoch if undefined

    // If the date is invalid, we need to return a fallback (optional)
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.error("Invalid date detected");
      return 0; // Or handle it as you prefer
    }

    return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
  });

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {!sortedProperties.length ? (
          <div className="flex justify-center items-center">
            <p>No properties found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedProperties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
