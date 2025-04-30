/**
 * Converts an object of key-value pairs into a URL query string.
 * Skips undefined or null values.
 */
export const createQueryString = (
  params: Record<string, string | undefined | null>
): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, value);
    }
  });
  return `?${searchParams.toString()}`;
};

/**
 * Parses a URL search string into an object of key-value pairs.
 */
export const parseQueryString = (search: string): Record<string, string> => {
  const searchParams = new URLSearchParams(search);
  const result: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};
