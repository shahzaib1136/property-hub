"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { Property } from "@lib/types/property";
import PropertyForm from "@/components/PropertyForm";
import { addProperty } from "@lib/utils/requests";
import { useRouter } from "next/navigation";

//Add formik validation later
const INITIAL_FIELDS_VALUES = {
  type: "",
  name: "",
  description: "",
  location: { street: "", city: "", state: "", zipcode: "" },
  beds: null,
  baths: null,
  squareFeet: null,
  amenities: [""],
  rates: {
    weekly: null,
    monthly: null,
    nightly: null,
  },
  sellerInfo: { name: "", email: "", phone: "" },
  images: [],
};

const AddProperties = () => {
  const [mounted, setIsMounted] = useState(false);
  const [fields, setFields] = useState<Property>(INITIAL_FIELDS_VALUES);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set state only after the component mounts on the client
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const target = event.target;
    const { name, value, type } = target;

    if (type === "file" && name === "images") {
      const files = (event.target as HTMLInputElement).files;

      if (files && files.length > 4) {
        alert("You can only upload up to 4 images.");
        return;
      }

      // Ensure files is not null before proceeding
      if (files) {
        const newImages: (string | File)[] = Array.from(files); // Safely convert FileList to File[]
        setFields((prev: Property) => ({
          ...prev,
          images: [...newImages], // Append new files to the existing images array
        }));
      }
      return;
    }

    // Handle nested fields like "location.city"
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");

      setFields((prev) => {
        const parent = parentKey as keyof Property;
        const nested = { ...(prev[parent] as Record<string, unknown>) };

        return {
          ...prev,
          [parent]: {
            ...nested,
            [childKey]: value,
          },
        };
      });

      return;
    }

    // Handle amenities checkboxes
    if (name === "amenities" && isInput(target)) {
      const isChecked = target.checked;

      setFields((prev) => {
        const amenities = isChecked
          ? [...prev.amenities, value]
          : prev.amenities.filter((item) => item !== value);

        return { ...prev, amenities };
      });

      return;
    }

    // Handle file inputs
    if (type === "file" && isInput(target)) {
      setFields((prev) => ({
        ...prev,
        [name]: target.files,
      }));
      return;
    }

    // Handle all other inputs
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  // Type guard: checks if target is HTMLInputElement
  const isInput = (target: EventTarget): target is HTMLInputElement => {
    return (target as HTMLInputElement).type !== undefined;
  };

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
      router.push(`/properties/${newProperty?.id}`);
    } catch (error) {
      console.error("Error:", error);
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
