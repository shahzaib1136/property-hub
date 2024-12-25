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
      <Image
        src={`/images/properties/${images[0]}`}
        alt={name}
        width={0}
        height={0}
        sizes="100vh"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <PropertyCardHeader type={type} name={name} rates={rates} />
        <PropertyCardDetails property={property} />
        <div className="border border-gray-100 mb-5"></div>
        <PropertyCardFooter location={location} id={property._id} />
      </div>
    </div>
  );
};

export default PropertyCard;
