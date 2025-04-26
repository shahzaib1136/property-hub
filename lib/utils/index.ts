// Generic function to get a string from FormData
export const getString = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return value ? value.toString() : "";
};

// Generic function to get a number (float) from FormData
export const getNumber = (
  formData: FormData,
  key: string,
  fallback: number | null = null
): number | null => {
  const value = formData.get(key) as string;
  return value ? parseFloat(value) : fallback;
};

// Generic function to get an integer from FormData
export const getInt = (
  formData: FormData,
  key: string,
  fallback: number | null = null
): number | null => {
  const value = formData.get(key) as string;
  return value ? parseInt(value) : fallback;
};

// Generic function to get a nested object from FormData (useful for fields like "location.street")
export const getObject = (formData: FormData, key: string) => {
  const prefix = `${key}.`;
  return {
    street: getString(formData, `${prefix}street`),
    city: getString(formData, `${prefix}city`),
    state: getString(formData, `${prefix}state`),
    zipcode: getString(formData, `${prefix}zipcode`),
  };
};
