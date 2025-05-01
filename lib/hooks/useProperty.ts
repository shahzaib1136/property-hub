import { Property } from "@lib/types/property";
import { useState } from "react";

export const INITIAL_FIELDS_VALUES = {
  type: "",
  name: "",
  description: "",
  location: { street: "", city: "", state: "", zipcode: "" },
  beds: null,
  baths: null,
  squareFeet: null,
  amenities: [],
  rates: {
    weekly: null,
    monthly: null,
    nightly: null,
  },
  sellerInfo: { name: "", email: "", phone: "" },
  images: [],
  hasContacted: false,
};

export const useProperty = () => {
  const [fields, setFields] = useState<Property>(INITIAL_FIELDS_VALUES);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const { name, value, type } = target;

    if (type === "file" && name === "images") {
      event.preventDefault();

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

  return { fields, setFields, handleChange };
};
