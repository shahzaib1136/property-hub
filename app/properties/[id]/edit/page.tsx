"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchProperty, updateProperty } from "@lib/api/propertiesApi";
import Spinner from "@/components/Spinner";
import PropertyForm from "@/components/PropertyForm";
import { useProperty } from "@lib/hooks/useProperty";
import { toast } from "react-toastify";

function EditProperties() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();
  const { fields, setFields, handleChange } = useProperty();

  const params = useParams<Record<string, string>>();
  const propertyId = params.id;

  useEffect(() => {
    if (!propertyId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const property = await fetchProperty(propertyId);

        if (property) {
          setFields(property);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [propertyId, setFields]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsUpdating(true);
      const newProperty = await updateProperty(propertyId, fields);
      toast.success("Property updated successfully!");
      router.push(`/properties/${newProperty?.id}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update property!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container max-w-2xl py-24 m-auto">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md-m-0">
          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : (
            <>
              <PropertyForm
                fields={fields}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEditForm
                isSubmitButtonDisable={isUpdating}
              />
              {isUpdating && <Spinner loading={true} overlay={true} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default EditProperties;
