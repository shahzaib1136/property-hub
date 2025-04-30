"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/common/Spinner";
import { fetchSearchProperties } from "@lib/api/propertiesApi";
import { Property } from "@lib/types/property";
import { parseQueryString } from "@lib/utils/searchParams";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const PropertiesSearchResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  const params = useSearchParams();
  const { location, propertyType } = parseQueryString(String(params));

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);

        const properties = await fetchSearchProperties({
          location,
          propertyType,
        });

        setProperties(properties || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (location || propertyType) {
      fetchProperties();
    }
  }, [location, propertyType]);

  if (isLoading) return <Spinner loading={isLoading} />;

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <Link href="/" className="flex items-center text-blue-500 mb-4">
          <FaAngleLeft /> Back to properties
        </Link>
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {properties.length === 0 ? (
          <p className="text-2xl text-center">No property found!</p>
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

export default PropertiesSearchResults;
