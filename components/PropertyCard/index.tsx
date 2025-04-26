import React from "react";
import Image from "next/image";

import PropertyCardHeader from "@/components/PropertyCard/PropertyCardHeader";
import PropertyCardDetails from "@/components/PropertyCard/PropertyCardDetails";
import PropertyCardFooter from "@/components/PropertyCard/PropertyCardFooter";
import { Property } from "@lib/types/property";

type PropertyCardProps = {
  property: Property;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { type, images, name, rates, location } = property;

  return (
    <div className="rounded-xl shadow-md relative">
      <div className="relative w-full h-64">
        <Image
          src={images[0] as string} // The first image in the images array
          alt={name}
          layout="fill" // This makes the image cover the div
          objectFit="cover" // Ensure the image doesn't distort and fills the container
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <PropertyCardHeader type={type} name={name} rates={rates} />
        <PropertyCardDetails property={property} />
        <div className="border border-gray-100 mb-5"></div>
        <PropertyCardFooter
          location={location}
          id={property.id || property.name}
        />
      </div>
    </div>
  );
};

export default PropertyCard;
