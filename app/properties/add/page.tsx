"use client";
import React, { FormEvent, useState, useEffect } from "react";
import PropertyForm from "@/components/AddPropertyForm";
import { addProperty } from "@lib/api/propertiesApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useProperty } from "@lib/hooks/useProperty";

//Add formik validation later
const AddProperties = () => {
  const [mounted, setIsMounted] = useState(false);

  const router = useRouter();
  const { fields, handleChange } = useProperty();

  useEffect(() => {
    setIsMounted(true); // Set state only after the component mounts on the client
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Handle images from formData
    const images: File[] = [];
    const imageFiles = formData.getAll("images");
    imageFiles.forEach((file: File | string) => {
      if (file instanceof File) {
        images.push(file);
      }
    });

    try {
      const newProperty = await addProperty(formData);
      toast.success("Property added successfully!");
      router.push(`/properties/${newProperty?.id}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add property!");
    }
  };

  return (
    mounted && (
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <PropertyForm
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
    )
  );
};

export default AddProperties;
