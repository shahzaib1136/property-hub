import { Property } from "@lib/types/property";
import React from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

// Reusable component for Rate display
const RateItem = ({
  label,
  amount,
}: {
  label: string;
  amount?: number | null;
}) => (
  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
    <div className="text-gray-500 mr-2 font-bold">{label}</div>
    {amount ? (
      <div className="text-2xl font-bold text-blue-500">
        ${amount.toLocaleString()}
      </div>
    ) : (
      <FaXmark className="text-2xl text-red-700" />
    )}
  </div>
);

// Reusable component for Property Stats
const PropertyStats = ({
  beds,
  baths,
  squareFeet,
}: {
  beds?: number | null;
  baths?: number | null;
  squareFeet?: number | null;
}) => (
  <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
    <p>
      <FaBed /> {beds ?? "N/A"}
    </p>
    <p>
      <FaBath /> {baths ?? "N/A"}
    </p>
    <p>
      <FaRulerCombined /> {squareFeet ?? "N/A"} sqft
    </p>
  </div>
);

// Reusable component for Amenities
const Amenities = ({ amenities }: { amenities: string[] }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
    {amenities.length ? (
      amenities.map((item) => (
        <li className="flex items-center" key={item}>
          <FaCheck className="text-green-600 mr-2" /> {item}
        </li>
      ))
    ) : (
      <p className="text-gray-500">No amenities listed</p>
    )}
  </ul>
);

function PropertyDetail({ property }: { property?: Property }) {
  if (!property)
    return (
      <p className="text-center text-gray-500">Property details unavailable.</p>
    );

  const {
    type,
    name,
    location,
    rates,
    beds,
    baths,
    squareFeet,
    description,
    amenities = [],
  } = property;

  return (
    <main>
      <section className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <p className="text-gray-500 mb-4">{type}</p>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        {location && (
          <div className="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
            <FaMapMarkerAlt className="text-lg text-orange-700 mr-2" />
            <p className="text-orange-700 leading-5">{`${location.street}, ${location.city}, ${location.state} ${location.zipcode}`}</p>
          </div>
        )}
      </section>

      {/* Rates Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <RateItem label="Nightly" amount={rates?.nightly} />
          <RateItem label="Weekly" amount={rates?.weekly} />
          <RateItem label="Monthly" amount={rates?.monthly} />
        </div>
      </section>

      {/* Description & Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <PropertyStats beds={beds} baths={baths} squareFeet={squareFeet} />
        <p className="text-gray-500 mb-4">
          {description || "No description available."}
        </p>
      </section>

      {/* Amenities Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>
        <Amenities amenities={amenities} />
      </section>

      {/* Map Placeholder */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map">Map will be diplay here</div>
      </section>
    </main>
  );
}

export default PropertyDetail;
