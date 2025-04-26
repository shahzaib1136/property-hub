import React from "react";

import { Property } from "@lib/types/property";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@lib/utils/requests";

const HomeProperty: React.FC = async () => {
  const properties = (await fetchProperties()) || [];

  // Shuffle properties array randomly
  const shuffledProperties = properties.sort(
    () => Math.random() - Math.random()
  );

  // Slice top 3 properties
  const topProperties = shuffledProperties.slice(0, 3);

  const renderProperties = () => {
    if (topProperties.length === 0) {
      return (
        <div className="col-span-3 text-center text-xl text-gray-600">
          No properties found.
        </div>
      );
    }

    return topProperties.map((property) => (
      <PropertyCard property={property as Property} key={property.id} />
    ));
  };

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderProperties()}
        </div>
      </div>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </section>
  );
};

export default HomeProperty;
