import React from "react";
import { getRateDisplay } from "@lib/utils/formatRates";
import { Rates } from "@lib/types/property";

type PropertyCardHeaderProps = {
  type: string;
  name: string;
  rates: Rates;
};

const PropertyCardHeader: React.FC<PropertyCardHeaderProps> = ({
  type,
  name,
  rates,
}) => (
  <div className="text-left md:text-center lg:text-left mb-6">
    <div className="text-gray-600">{type}</div>
    <h3 className="text-xl font-bold">{name}</h3>
    <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
      {getRateDisplay(rates)}
    </h3>
  </div>
);

export default PropertyCardHeader;
