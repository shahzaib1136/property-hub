// Utility function for generating API responses
export const createResponse = <T>(
  success: boolean,
  data: T | null = null,
  message: string,
  status: number
): Response => {
  return new Response(
    JSON.stringify({
      success,
      data,
      message,
    }),
    {
      status,
    }
  );
};

// Utility function for handling errors
export const handleError = (error: {
  status?: number;
  message?: string;
}): Response => {
  console.error(error);
  return createResponse(
    false,
    null,
    error.message || "Something went wrong",
    error.status || 500
  );
};
