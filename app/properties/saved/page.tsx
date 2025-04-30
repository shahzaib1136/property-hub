"use client";

import Spinner from "@/components/common/Spinner";
import { fetchUserSavedProperties } from "@lib/api/bookmarks";
import { Property } from "@lib/types/property";
import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

const SavedProperties = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserSavedProperties();
        setProperties(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Saved Properties
        </h2>

        {properties.length === 0 ? (
          <div className="text-2xl text-center mt-20">No Property Found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
