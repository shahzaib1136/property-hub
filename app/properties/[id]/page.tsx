"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { fetchProperty } from "@lib/api/propertiesApi";
import { Property } from "@lib/types/property";
import PropertyHeaderImage from "@/components/property/PropertyHeaderImage";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import PropertyDetail from "@/components/property/PropertyDetail";
import Spinner from "@/components/common/Spinner";
import PropertyImages from "@/components/property/PropertyImages";
import BookmarkButton from "@/components/property/BookmarkButton";
import ShareButton from "@/components/property/ShareButton";
import PropertyContactForm from "@/components/AddPropertyForm/PropertyContactForm";

function PropertyPage() {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property>();
  const [isLoading, setIsLoading] = useState(true);

  const { images = [] } = property || {};

  useEffect(() => {
    const fetchPropertyById = async () => {
      if (!id) return;

      setIsLoading(true);
      const property = await fetchProperty(id);

      setProperty(property);

      try {
      } catch (error) {
        console.log("Error fetching property", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!property) {
      fetchPropertyById();
    }
  }, [id, property]);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  if (!isLoading && !property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={images[0] as string} />

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
            Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetail property={property} />

            <aside className="space-y-4">
              <BookmarkButton propertyId={id} />
              <ShareButton property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={images as string[]} />
    </>
  );
}

export default PropertyPage;
