/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";

const Properties = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {!properties.length ? (
            <p>No properties found</p>
          ) : (
            properties.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Properties;
