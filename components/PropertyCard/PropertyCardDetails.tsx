import React from "react";
import { FaBath, FaBed, FaRulerCombined, FaMoneyBill } from "react-icons/fa";
import { Property } from "@lib/types/property";

type PropertyCardDetailsProps = {
  property: Property;
};

const PropertyCardDetails: React.FC<PropertyCardDetailsProps> = ({
  property,
}) => {
  const { beds, baths, squareFeet, rates } = property;

  return (
    <div>
      <div className="flex justify-center gap-4 text-gray-500 mb-4">
        <p className="flex items-center">
          <FaBed className="mr-2" /> {beds} <span className="ml-1">Beds</span>
        </p>
        <p className="flex items-center">
          <FaBath className="mr-2" /> {baths}{" "}
          <span className="ml-1">Baths</span>
        </p>
        <p className="flex items-center">
          <FaRulerCombined className="mr-2" /> {squareFeet}{" "}
          <span className="ml-1">sqft</span>
        </p>
      </div>

      <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
        {rates.weekly && (
          <p className="flex items-center gap-1">
            <FaMoneyBill /> Weekly
          </p>
        )}
        {rates.monthly && (
          <p className="flex items-center gap-1">
            <FaMoneyBill /> Monthly
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyCardDetails;
