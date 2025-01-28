import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

type PropertyCardFooterProps = {
  location: { city: string; state: string };
  id: string;
};

const PropertyCardFooter: React.FC<PropertyCardFooterProps> = ({
  location,
  id,
}) => (
  <div className="flex flex-col lg:flex-row justify-between mb-4">
    <div className="flex items-center gap-2 mb-4 lg:mb-0">
      <FaMapMarkerAlt className="text-lg text-orange-700" />
      <span className="text-orange-700">
        {`${location.city}, ${location.state}`}
      </span>
    </div>
    <Link
      href={`/properties/${id}`}
      className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
    >
      Details
    </Link>
  </div>
);

export default PropertyCardFooter;
