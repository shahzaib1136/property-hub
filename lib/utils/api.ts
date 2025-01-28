import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// API base URL (can be different for development and production environments)
const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3000";

// Type for the API response to make it more flexible
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Custom error class to enhance error details
class ApiError extends Error {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// Function to handle API requests with a generic response type
const axiosApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Record<string, unknown>, // Updated: specify type for body data (optional)
  headers: Record<string, string> = {},
  params?: Record<string, string | number> // Added params for query parameters
): Promise<T> => {
  try {
    // Default headers (You can include Authorization token or other headers)
    const defaultHeaders = {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      ...headers,
    };

    // Request configuration
    const config: AxiosRequestConfig = {
      method,
      url: `${API_URL}${endpoint}`,
      data, // If method is POST, PUT, DELETE, this will be the body
      headers: defaultHeaders,
      params,
    };

    // Send the request
    const response: AxiosResponse<ApiResponse<T>> = await axios(config);

    // Return the response data
    return response.data.data; // Extract the actual data from the response
  } catch (error: unknown) {
    console.error("API request error:", error);

    if (axios.isAxiosError(error) && error.response) {
      // Extracting the error details from the response
      const status = error.response.status;
      const message = error.response.data.message || "An error occurred";

      // Log specific status code if necessary
      switch (status) {
        case 400:
          console.error("Bad Request:", message);
          break;
        case 401:
          console.error("Unauthorized:", message);
          break;
        case 500:
          console.error("Internal Server Error:", message);
          break;
        default:
          console.error(`Error ${status}:`, message);
          break;
      }

      // Throw a custom error with status and message
      throw new ApiError(message, status);
    }

    // Handle unknown errors
    throw new ApiError("An unknown error occurred", 500);
  }
};

export default axiosApi;
